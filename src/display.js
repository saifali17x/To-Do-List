import { Project, todo, ProjectManager } from "./index.js";
import { parseISO, format } from "date-fns";

class TodoDisplay {
  constructor() {
    this.projectManager = new ProjectManager();
    this.currentProjectId = null;
    this.editingTodoId = null;

    this.initializeElements();
    this.loadFromLocalStorage();
    this.setupEventListeners();
    this.render();
  }

  initializeElements() {
    this.nav = document.querySelector("nav");
    this.mainContent = document.getElementById("main-content");
    this.dialog = document.querySelector("dialog");
    this.form = this.dialog.querySelector("form");

    // Form elements
    this.titleInput = document.getElementById("title");
    this.descriptionInput = document.getElementById("description");
    this.dueDateInput = document.getElementById("due-date");
    this.priorityInputs = document.querySelectorAll('input[name="priority"]');
  }

  setupEventListeners() {
    // Dialog form submission
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Dialog close on backdrop click
    this.dialog.addEventListener("click", (e) => {
      if (e.target === this.dialog) {
        this.closeDialog();
      }
    });

    // Dialog close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.dialog.open) {
        this.closeDialog();
      }
    });

    // Dialog cancel button
    this.dialog.addEventListener("click", (e) => {
      if (e.target.classList.contains("cancel-btn")) {
        this.closeDialog();
      }
    });

    // Add project button
    this.nav.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-project-btn")) {
        this.addNewProject();
      }
    });

    // Project selection and deletion
    this.nav.addEventListener("click", (e) => {
      if (e.target.classList.contains("project-btn")) {
        const projectId = e.target.dataset.projectId;
        this.selectProject(projectId);
      } else if (e.target.classList.contains("delete-project-btn")) {
        e.stopPropagation();
        const projectId = e.target.dataset.projectId;
        this.deleteProject(projectId);
      }
    });

    // Todo actions
    this.mainContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-todo-btn")) {
        this.openDialog();
      } else if (e.target.classList.contains("complete-btn")) {
        this.toggleTodoComplete(e.target.dataset.todoId);
      } else if (e.target.classList.contains("delete-btn")) {
        this.deleteTodo(e.target.dataset.todoId);
      } else if (e.target.classList.contains("edit-btn")) {
        this.editTodo(e.target.dataset.todoId);
      }
    });
  }

  addNewProject() {
    const projectName = prompt("Enter project name:");
    if (projectName && projectName.trim()) {
      const project = new Project(projectName.trim());
      this.projectManager.addProject(project);
      this.saveToLocalStorage();
      this.render();
      this.selectProject(project.id);
    }
  }

  selectProject(projectId) {
    this.currentProjectId = projectId;
    this.projectManager.setCurrentId(projectId);
    this.render();
  }

  openDialog(todoData = null) {
    this.editingTodoId = todoData ? todoData.id : null;

    if (todoData) {
      // Edit mode
      this.titleInput.value = todoData.title;
      this.descriptionInput.value = todoData.description;
      this.dueDateInput.value = this.formatDateForInput(todoData.dueDate);

      // Set priority
      this.priorityInputs.forEach((input) => {
        input.checked = input.value === todoData.priority;
      });
    } else {
      // Add mode
      this.form.reset();
      this.dueDateInput.value = this.formatDateForInput(new Date());
    }

    this.dialog.showModal();
  }

  handleFormSubmit() {
    const formData = new FormData(this.form);
    const todoData = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("due-date")
        ? new Date(formData.get("due-date"))
        : new Date(),
      priority: formData.get("priority"),
    };

    if (this.editingTodoId) {
      this.updateTodo(this.editingTodoId, todoData);
    } else {
      this.addTodo(todoData);
    }

    this.closeDialog();
  }

  closeDialog() {
    this.dialog.close();
    this.editingTodoId = null;
    this.form.reset();
  }

  addTodo(todoData) {
    if (!this.currentProjectId) {
      alert("Please select a project first!");
      return;
    }

    const newTodo = new todo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority
    );

    const currentProject = this.projectManager.getCurrentProject();
    currentProject.addTodo(newTodo);
    this.saveToLocalStorage();
    this.render();
  }

  updateTodo(todoId, todoData) {
    const currentProject = this.projectManager.getCurrentProject();
    const todo = currentProject.todos.find((t) => t.id === todoId);

    if (todo) {
      todo.setTitle(todoData.title);
      todo.setDescription(todoData.description);
      todo.setDueDate(todoData.dueDate);
      todo.setPriority(todoData.priority);
      this.saveToLocalStorage();
      this.render();
    }
  }

  toggleTodoComplete(todoId) {
    const currentProject = this.projectManager.getCurrentProject();
    const todo = currentProject.todos.find((t) => t.id === todoId);

    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
      this.render();
    }
  }

  deleteTodo(todoId) {
    if (confirm("Are you sure you want to delete this todo?")) {
      const currentProject = this.projectManager.getCurrentProject();
      currentProject.removeTodo(todoId);
      this.saveToLocalStorage();
      this.render();
    }
  }

  editTodo(todoId) {
    const currentProject = this.projectManager.getCurrentProject();
    const todo = currentProject.todos.find((t) => t.id === todoId);

    if (todo) {
      this.openDialog(todo);
    }
  }

  deleteProject(projectId) {
    const project = this.projectManager.getProject(projectId);
    if (!project) return;

    const projectName = project.name;
    const todoCount = project.todos.length;
    
    const message = todoCount > 0 
      ? `Are you sure you want to delete "${projectName}"? This will also delete ${todoCount} todo${todoCount === 1 ? '' : 's'} in this project.`
      : `Are you sure you want to delete "${projectName}"?`;

    if (confirm(message)) {
      // If we're deleting the current project, switch to another one first
      if (projectId === this.currentProjectId) {
        const projects = this.projectManager.getAllProjects();
        const otherProject = projects.find(p => p.id !== projectId);
        if (otherProject) {
          this.currentProjectId = otherProject.id;
          this.projectManager.setCurrentId(otherProject.id);
        } else {
          this.currentProjectId = null;
        }
      }

      this.projectManager.removeProject(projectId);
      this.saveToLocalStorage();
      this.render();
    }
  }

  render() {
    this.renderProjects();
    this.renderTodos();
  }

  renderProjects() {
    const projects = this.projectManager.getAllProjects();

    let projectsHTML = '<ul class="project-list">';

    if (projects.length === 0) {
      // Create default project if none exist
      const defaultProject = new Project("My Tasks");
      this.projectManager.addProject(defaultProject);
      this.currentProjectId = defaultProject.id;
      this.projectManager.setCurrentId(defaultProject.id);
      projects.push(defaultProject);
    }

    projects.forEach((project) => {
      const isActive = project.id === this.currentProjectId;
      projectsHTML += `
        <li class="project-item">
          <div class="project-container">
            <button class="project-btn ${
              isActive ? "active" : ""
            }" data-project-id="${project.id}">
              ${project.name} (${project.todos.length})
            </button>
            ${projects.length > 1 ? `<button class="delete-project-btn" data-project-id="${project.id}" title="Delete Project">×</button>` : ''}
          </div>
        </li>
      `;
    });

    projectsHTML += "</ul>";
    projectsHTML += '<button class="add-project-btn">+ New Project</button>';

    this.nav.innerHTML = projectsHTML;
  }

  renderTodos() {
    const currentProject = this.projectManager.getCurrentProject();

    if (!currentProject) {
      this.mainContent.innerHTML = `
        <div class="empty-state">
          <h3>No Project Selected</h3>
          <p>Please select a project from the sidebar to view its todos.</p>
        </div>
      `;
      return;
    }

    const todos = currentProject.getTodos();

    let contentHTML = `
      <div class="content-header">
        <h2>${currentProject.name}</h2>
        <button class="add-todo-btn">+ Add Todo</button>
      </div>
    `;

    if (todos.length === 0) {
      contentHTML += `
        <div class="empty-state">
          <h3>No Todos Yet</h3>
          <p>Click "Add Todo" to create your first task in this project.</p>
        </div>
      `;
    } else {
      contentHTML += '<ul class="todo-list">';

      todos.forEach((todo) => {
        contentHTML += this.renderTodoItem(todo);
      });

      contentHTML += "</ul>";
    }

    this.mainContent.innerHTML = contentHTML;
  }

  renderTodoItem(todo) {
    const dueDate = this.formatDate(todo.dueDate);
    const priorityClass = `priority-${todo.priority.toLowerCase()}`;
    const completedClass = todo.completed ? "completed" : "";
    const completedText = todo.completed ? "Undo" : "Complete";

    return `
      <li class="todo-item ${completedClass}">
        <div class="todo-header">
          <div>
            <h3 class="todo-title">${todo.title}</h3>
            <span class="todo-priority ${priorityClass}">${todo.priority}</span>
          </div>
        </div>
        ${
          todo.description
            ? `<p class="todo-description">${todo.description}</p>`
            : ""
        }
        <div class="todo-meta">
          <span class="todo-due-date">Due: ${dueDate}</span>
          <div class="todo-actions">
            <button class="todo-btn complete-btn" data-todo-id="${
              todo.id
            }">${completedText}</button>
            <button class="todo-btn edit-btn" data-todo-id="${
              todo.id
            }">Edit</button>
            <button class="todo-btn delete-btn" data-todo-id="${
              todo.id
            }">Delete</button>
          </div>
        </div>
      </li>
    `;
  }

  formatDate(date) {
    try {
      return format(new Date(date), "MMM dd, yyyy HH:mm");
    } catch {
      return "Invalid date";
    }
  }

  formatDateForInput(date) {
    try {
      const d = new Date(date);
      return d.toISOString().slice(0, 16);
    } catch {
      return "";
    }
  }

  saveToLocalStorage() {
    const data = {
      projects: this.projectManager.projects,
      currentProjectId: this.currentProjectId,
    };
    localStorage.setItem("todoApp", JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem("todoApp");
    if (saved) {
      try {
        const data = JSON.parse(saved);

        // Restore projects
        Object.keys(data.projects).forEach((projectId) => {
          const projectData = data.projects[projectId];
          const project = new Project(projectData.name, projectData.todos);
          project.id = projectId;
          this.projectManager.projects[projectId] = project;
        });

        // Restore current project
        if (
          data.currentProjectId &&
          this.projectManager.projects[data.currentProjectId]
        ) {
          this.currentProjectId = data.currentProjectId;
          this.projectManager.setCurrentId(data.currentProjectId);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoDisplay();
});
