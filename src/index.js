import './styles.css';
import './display.js';

export class Project {
  constructor(name, todos = []) {
    this.name = name || "Default Project";
    this.todos = todos;
    this.id = crypto.randomUUID();
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((t) => t.id !== todoId);
  }

  getTodos() {
    return this.todos;
  }
}

export class todo {
  constructor(title, description, dueDate, priority) {
    this.title = title || "Untitled Task";
    this.description = description || "";
    this.dueDate = dueDate || new Date();
    this.priority = priority || "Normal";
    this.completed = false;
    this.id = crypto.randomUUID();
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }
}

export class ProjectManager {
  constructor() {
    this.projects = {};
    this.currentId = null;
  }

  addProject(project) {
    this.projects[project.id] = project;
  }

  getProject(id) {
    return this.projects[id];
  }

  getAllProjects() {
    return Object.values(this.projects);
  }

  removeProject(id) {
    delete this.projects[id];
  }

  setCurrentId(id) {
    this.currentId = id;
  }

  getCurrentProject() {
    return this.projects[this.currentId];
  }
}


