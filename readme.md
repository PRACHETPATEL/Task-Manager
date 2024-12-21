# Task Manager Web Application

This is a simple Task Manager Web Application that allows users to manage their daily tasks. The application supports task creation, marking tasks as complete, deleting tasks, editing tasks, and filtering tasks. It uses JavaScript for dynamic behavior, jQuery for enhancements like smooth animations and filtering, and local storage to persist tasks.
## Table of Contents

- [Features Implemented](#features-implemented)
- [How to Run the Webpage Locally](#how-to-run-the-project-locally)
- [Folder Structure](#folder-structure)
## Features Implemented

### 1. **Basic Page Setup**
- **HTML Structure**: 
  - A header with the title "Task Manager".
  - An input field to add a new task.
  - A button labeled "Add Task".
  - A list to display the tasks.
- **CSS Styling**:
  - Clean, visually appealing design.
  - Completed tasks are visually indicated with strikethrough text or a green background.

### 2. **Dynamic Behavior (JavaScript)**
- **Add a Task**:
  - Users can enter a task and click the "Add Task" button.
  - Validates input to ensure it is not empty.
  - New tasks are added dynamically to the list with "Mark Complete" and "Delete" buttons.
- **Mark Task as Complete**:
  - Clicking "Mark Complete" will add a strikethrough to the task or change its background to green, indicating completion.
- **Delete a Task**:
  - Clicking "Delete" will remove the task from the list.

### 3. **Enhancements with jQuery**
- **Smooth Animations**:
  - Fade-in effect when a task is added.
  - Fade-out effect when a task is deleted.
- **Filter Tasks**:
  - Dropdown menu with the following options:
    - **All Tasks**: Show all tasks.
    - **Completed Tasks**: Show only completed tasks.
    - **Pending Tasks**: Show only pending tasks.
  - Uses jQuery to filter tasks dynamically based on the selected option.
  
### 4. **Optional Enhancements**
- **Edit Task**:
  - An "Edit" button allows the user to modify the task name when clicked.

### 5. **Local Storage**
- Tasks are saved to **Local Storage** so that they persist even after the page is refreshed.
- Each task is assigned a unique identifier (UUID) generated via the `uuid` CDN.

---

## How to Run the Project Locally

### Prerequisites:
- A web browser (Google Chrome, Firefox, etc.)
- Internet Connection as Icons(FONT AWESOME) are imported using CDN
### Steps:
1. Download or clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/task-manager.git
2. Open the `index.html` file in your browser.
3. The application will be ready to use.

---

## Folder Structure
```
project
│   README.md
│   index.html
|   package.json    
│
└───ASSETS
│   │   logo.jpg
│   
└───CSS
|   │   style.css
|   
└───JS
    |   script.js
    |   jquery.min.js
    |   uuid.min.js
```