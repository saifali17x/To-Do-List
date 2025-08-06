# To-Do-List

A modern, feature-rich To-Do List application built with vanilla JavaScript, featuring project management, priority levels, and beautiful UI design.

![To-Do List App](https://img.shields.io/badge/Status-Live-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS](https://img.shields.io/badge/CSS3-Modern-blue)
![Webpack](https://img.shields.io/badge/Webpack-5.0+-orange)

## ✨ Features

### 🗂️ **Project Management**
- Create multiple projects to organize your tasks
- Switch between projects seamlessly
- Delete projects with confirmation (safely handles todos)
- Visual project counter showing todo count

### 📝 **Task Management**
- Add, edit, and delete todos
- Mark todos as complete/incomplete
- Set priority levels (High, Normal, Low)
- Add detailed descriptions
- Set due dates with datetime picker

### 🎨 **Modern UI/UX**
- Vibrant gradient design with smooth animations
- Responsive layout for all devices
- Glassmorphism effects with backdrop blur
- Hover animations and visual feedback
- Modal dialogs for task creation/editing

### 💾 **Data Persistence**
- Automatic local storage saving
- Data persists between browser sessions
- No data loss on page refresh

### ⌨️ **User Experience**
- Keyboard shortcuts (Escape to close dialogs)
- Click outside dialog to cancel
- Form validation and error handling
- Intuitive drag-and-drop style interactions

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **Build Tool**: Webpack 5 with hot module replacement
- **Date Handling**: date-fns library
- **Icons**: Unicode symbols and CSS styling
- **Storage**: Browser Local Storage API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd To-Do-List
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - Navigate to `http://localhost:8080`
   - The app will automatically reload on file changes

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

## 📱 Usage Guide

### Creating Projects
1. Click the "Add Project" button in the sidebar
2. Enter a project name when prompted
3. Your new project will appear in the navigation

### Adding Todos
1. Select a project from the sidebar
2. Click "Add Todo" button
3. Fill in the form:
   - **Title**: Required task name
   - **Description**: Optional detailed description
   - **Due Date**: Set deadline (optional)
   - **Priority**: Choose High, Normal, or Low
4. Click "OK" to save

### Managing Todos
- **Complete**: Click the checkmark button
- **Edit**: Click the edit button to modify details
- **Delete**: Click the delete button to remove
- **Priority**: Visual indicators show task importance

### Project Management
- **Switch Projects**: Click any project in the sidebar
- **Delete Projects**: Click the × button next to project name
- **Project Counter**: See how many todos are in each project

## 🎨 Design Features

### Color Scheme
- **Primary**: Vibrant gradients (Red → Teal → Blue)
- **Accent**: White glassmorphism panels
- **Priority Colors**: 
  - High: Red gradient
  - Normal: Yellow gradient  
  - Low: Teal gradient

### Responsive Design
- **Desktop**: Two-column layout with sidebar navigation
- **Mobile**: Single-column layout with reordered elements
- **Tablet**: Adaptive grid system

### Animations
- Smooth hover effects on all interactive elements
- Transform animations for buttons and cards
- Fade-in/out transitions for modals
- Micro-interactions for better UX

## 📁 Project Structure

```
To-Do-List/
├── src/
│   ├── index.js          # Main entry point & data models
│   ├── display.js        # UI logic & event handlers
│   ├── styles.css        # Complete styling
│   └── template.html     # HTML structure
├── dist/                 # Production build (generated)
├── webpack.common.js     # Shared webpack config
├── webpack.dev.js        # Development config
├── webpack.prod.js       # Production config
├── package.json          # Dependencies & scripts
└── README.md            # This file
```

## 🔧 Development

### Available Scripts
- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run dev` - Development build
- `npm run serve` - Serve production build locally

### Key Classes
- **`Project`**: Manages project data and todos
- **`todo`**: Individual task with properties and methods
- **`ProjectManager`**: Handles project operations and storage
- **`TodoDisplay`**: Controls UI rendering and user interactions

## 🌟 Key Features Explained

### Local Storage Integration
The app automatically saves all data to browser local storage, ensuring your todos persist between sessions. Data is serialized as JSON and includes:
- All projects with their todos
- Current active project
- Todo completion status and metadata

### Event Delegation
Uses efficient event delegation for dynamic content, reducing memory usage and improving performance when handling many todos.

### Modular Architecture
Clean separation of concerns with distinct classes for data management, UI logic, and styling.

## 🚀 Deployment

The built application in the `dist` folder can be deployed to any static hosting service:

- **GitHub Pages**: Upload `dist` contents to gh-pages branch
- **Netlify**: Drag and drop `dist` folder or connect repository
- **Vercel**: Import repository and set build directory to `dist`
- **Firebase Hosting**: Deploy `dist` folder using Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for simple, effective task management
- Designed for optimal user experience and performance

---

**Happy Task Managing!** 🎯✨