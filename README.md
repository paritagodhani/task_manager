# 📋 Task Manager Pro

### A Modern Full-Stack Task Management Application

Manage your tasks with full CRUD operations, priority filters, status tracking, and a responsive user interface.

---

## ✨ Features

* Create Tasks
* Edit Tasks
* Delete Tasks
* Mark Tasks as Completed
* Priority Levels (Low, Medium, High)
* Filter by Priority and Status
* Dashboard Statistics
* MongoDB Database Integration
* Responsive Design
* Smooth User Experience

---

## 🛠️ Tech Stack

| Layer           | Technology            |
| --------------- | --------------------- |
| Frontend        | Next.js 16 + React 19 |
| Language        | TypeScript            |
| Styling         | Tailwind CSS          |
| Backend         | Next.js API Routes    |
| Database        | MongoDB + Mongoose    |
| Package Manager | pnpm                  |

---

## 📁 Project Structure

```text
task_manager_pro/
├── app/
│   ├── api/tasks/
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── TaskItem.tsx
│   ├── TaskFormSimple.tsx
│   ├── FilterPanel.tsx
│   ├── Modal.tsx
│   └── ValidationAlert.tsx
├── lib/
│   ├── mongodb.ts
│   └── models/Task.ts
├── .env.example
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

* Node.js v18+
* pnpm
* MongoDB

### Installation

```bash
git clone https://github.com/paritagodhani/task_manager_pro.git

cd task_manager_pro

pnpm install

cp .env.example .env.local
```

Update `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
```

Start MongoDB:

```bash
mongod
```

Run the application:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get all tasks |
| POST   | /api/tasks     | Create a task |
| PUT    | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

---

## 🗂️ Database Schema

| Field       | Type   |
| ----------- | ------ |
| title       | String |
| description | String |
| priority    | String |
| status      | String |
| dueDate     | Date   |
| createdAt   | Date   |
| updatedAt   | Date   |

### Priority Values

* Low
* Medium
* High

### Status Values

* Pending
* Completed

---

## 📱 Application Features

* Task Creation
* Task Editing
* Task Deletion
* Status Management
* Priority Management
* Task Filtering
* Dashboard Statistics
* Responsive Layout
* MongoDB Data Persistence

---

### Developed using Next.js, TypeScript, Tailwind CSS, and MongoDB.
