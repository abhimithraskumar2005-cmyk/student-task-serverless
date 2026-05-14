const API_BASE_URL = "";
const DEMO_USER_ID = "demo-student";
const STORAGE_KEY = "student-task-cloud-tracker";

const taskForm = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const formMessage = document.querySelector("#formMessage");
const refreshButton = document.querySelector("#refreshButton");
const modePill = document.querySelector("#modePill");

const titleInput = document.querySelector("#titleInput");
const descriptionInput = document.querySelector("#descriptionInput");
const statusInput = document.querySelector("#statusInput");
const deadlineInput = document.querySelector("#deadlineInput");

const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const progressCount = document.querySelector("#progressCount");
const completedCount = document.querySelector("#completedCount");

let editingTaskId = null;

function isApiMode() {
  return API_BASE_URL.trim().length > 0;
}

function getStoredTasks() {
  const rawTasks = localStorage.getItem(STORAGE_KEY);
  return rawTasks ? JSON.parse(rawTasks) : [];
}

function saveStoredTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createId() {
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function loadTasks() {
  modePill.textContent = isApiMode() ? "AWS API Mode" : "Local Demo Mode";

  if (isApiMode()) {
    const data = await apiRequest(`/tasks?userId=${encodeURIComponent(DEMO_USER_ID)}`);
    return data.tasks || [];
  }

  return getStoredTasks();
}

async function saveTask(task) {
  if (isApiMode()) {
    if (editingTaskId) {
      return apiRequest(`/tasks/${editingTaskId}`, {
        method: "PUT",
        body: JSON.stringify(task),
      });
    }

    return apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });
  }

  const tasks = getStoredTasks();
  if (editingTaskId) {
    const updatedTasks = tasks.map((item) =>
      item.taskId === editingTaskId ? { ...item, ...task, updatedAt: new Date().toISOString() } : item
    );
    saveStoredTasks(updatedTasks);
    return;
  }

  saveStoredTasks([
    ...tasks,
    {
      ...task,
      userId: DEMO_USER_ID,
      taskId: createId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
}

async function deleteTask(taskId) {
  if (isApiMode()) {
    await apiRequest(`/tasks/${taskId}?userId=${encodeURIComponent(DEMO_USER_ID)}`, {
      method: "DELETE",
    });
    return;
  }

  saveStoredTasks(getStoredTasks().filter((task) => task.taskId !== taskId));
}

function updateStats(tasks) {
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.filter((task) => task.status === "Pending").length;
  progressCount.textContent = tasks.filter((task) => task.status === "In Progress").length;
  completedCount.textContent = tasks.filter((task) => task.status === "Completed").length;
}

function renderTasks(tasks) {
  updateStats(tasks);

  if (!tasks.length) {
    taskList.innerHTML = `<div class="empty-state">No tasks yet. Add your first capstone task.</div>`;
    return;
  }

  taskList.innerHTML = tasks
    .map(
      (task) => `
        <article class="task-item">
          <header>
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
            <span class="tag">${escapeHtml(task.status)}</span>
          </header>
          <p class="task-description">${escapeHtml(task.description || "No description added.")}</p>
          <div class="task-meta">
            <span class="tag">Deadline: ${escapeHtml(task.deadline || "Not set")}</span>
            <span class="tag">ID: ${escapeHtml(task.taskId)}</span>
          </div>
          <div class="task-actions">
            <button type="button" data-edit="${escapeHtml(task.taskId)}">Edit</button>
            <button class="danger-button" type="button" data-delete="${escapeHtml(task.taskId)}">Delete</button>
          </div>
        </article>
      `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function refreshTasks() {
  try {
    const tasks = await loadTasks();
    renderTasks(tasks);
  } catch (error) {
    formMessage.textContent = `Could not load tasks: ${error.message}`;
  }
}

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const task = {
    userId: DEMO_USER_ID,
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    status: statusInput.value,
    deadline: deadlineInput.value,
  };

  if (!task.title) {
    formMessage.textContent = "Please enter a task title.";
    return;
  }

  try {
    await saveTask(task);
    formMessage.textContent = editingTaskId ? "Task updated successfully." : "Task saved successfully.";
    editingTaskId = null;
    taskForm.reset();
    await refreshTasks();
  } catch (error) {
    formMessage.textContent = `Could not save task: ${error.message}`;
  }
});

taskList.addEventListener("click", async (event) => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;

  if (editId) {
    const tasks = await loadTasks();
    const task = tasks.find((item) => item.taskId === editId);
    if (!task) return;

    editingTaskId = editId;
    titleInput.value = task.title;
    descriptionInput.value = task.description || "";
    statusInput.value = task.status;
    deadlineInput.value = task.deadline || "";
    formMessage.textContent = "Editing selected task.";
  }

  if (deleteId) {
    await deleteTask(deleteId);
    formMessage.textContent = "Task deleted successfully.";
    await refreshTasks();
  }
});

refreshButton.addEventListener("click", refreshTasks);

refreshTasks();

