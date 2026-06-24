<div align="center">

# 📋 Task Manager Pro

### A Modern, Full-Stack Task Management Application

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.3.0-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

**Manage your tasks beautifully — with full CRUD, priority filters, and animated UI.**

</div>

---

## ✨ Features

- 🆕 **Create Tasks** — Add tasks with title, description, priority, status & due date
- ✏️ **Edit Tasks** — Update any task with a smooth modal form
- 🗑️ **Delete Tasks** — Remove tasks with confirmation dialog
- ✅ **Mark as Done** — Animated checkbox with strikethrough effect
- 🎯 **Priority Levels** — Low / Medium / High with color-coded badges
- 🔍 **Filter Tasks** — Filter by Priority and Status
- 📊 **Stats Dashboard** — Total, Pending, Completed, High Priority counts
- 🍃 **MongoDB Database** — Persistent storage with Mongoose
- 🎨 **Animations** — Framer Motion throughout
- 📱 **Responsive** — Mobile, tablet & desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 + React 19 |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS v4 + Framer Motion |
| **Backend** | Next.js API Routes (built-in) |
| **Database** | MongoDB + Mongoose |
| **Package Manager** | pnpm |

---

## 📁 Project Structure

```
task_manager_pro/
├── app/
│   ├── api/tasks/
│   │   ├── route.ts          # GET, POST
│   │   └── [id]/route.ts     # PUT, DELETE
│   ├── page.tsx              # Main UI
│   └── globals.css
├── components/
│   ├── TaskItem.tsx          # Task card
│   ├── TaskFormSimple.tsx    # Add/Edit form
│   ├── FilterPanel.tsx       # Filters
│   ├── Modal.tsx             # Modal
│   └── ValidationAlert.tsx  # Alerts
├── lib/
│   ├── mongodb.ts            # DB connection
│   └── models/Task.ts        # Mongoose schema
├── .env.example              # Env template
└── AI_USAGE.md               # AI documentation
```

---

## 🚀 Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) → `npm install -g pnpm`
- [MongoDB](https://www.mongodb.com/try/download/community) (local)

### Steps

```bash
# 1. Clone
git clone https://github.com/paritagodhani/task_manager_pro.git
cd task_manager_pro

# 2. Install dependencies
pnpm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local → add your MONGODB_URI

# 4. Start MongoDB (separate terminal)
mongod

# 5. Run the app
pnpm dev
```

Open **http://localhost:3000** 🎉

---

## 🔑 Environment Variables

Create `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Fetch all tasks |
| `GET` | `/api/tasks?priority=High&status=Pending` | Filtered tasks |
| `POST` | `/api/tasks` | Create task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

### POST Body Example

```json
{
  "title": "Fix Login Bug",
  "description": "Users getting 500 error on login page when wrong password entered",
  "priority": "High",
  "status": "Pending",
  "dueDate": "2026-07-05"
}
```

---

## 🗂️ MongoDB Schema

**Database:** `task-manager` | **Collection:** `tasks`

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `title` | String | ✅ | 3–100 chars |
| `description` | String | ✅ | 10–1000 chars |
| `priority` | String | ✅ | `Low` / `Medium` / `High` |
| `status` | String | ✅ | `Pending` / `Completed` |
| `dueDate` | Date | ✅ | Future date only |
| `createdAt` | Date | Auto | Mongoose timestamp |
| `updatedAt` | Date | Auto | Mongoose timestamp |

---

## 🧪 Add Sample Tasks (PowerShell)

```powershell
$tasks = @(
  @{ title="Fix Login Bug"; description="Users getting 500 error on login page when wrong password entered"; priority="High"; status="Pending"; dueDate="2026-07-05" },
  @{ title="Add Dark Mode"; description="Implement dark mode toggle for entire application with preference saved"; priority="Medium"; status="Pending"; dueDate="2026-08-10" },
  @{ title="Write API Docs"; description="Write complete documentation for all REST API endpoints with examples"; priority="Low"; status="Pending"; dueDate="2026-09-01" },
  @{ title="Setup MongoDB"; description="Install and configure MongoDB with Mongoose connection for task manager"; priority="High"; status="Completed"; dueDate="2026-12-31" }
)

foreach ($task in $tasks) {
  Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method POST -ContentType "application/json" -Body ($task | ConvertTo-Json)
  Write-Host "Added: $($task.title)" -ForegroundColor Green
}
```

---

## 🤖 AI Tools Used

See [AI_USAGE.md](./AI_USAGE.md) for full details on how AI assisted in building this project.

---

## 📄 License

MIT License — free to use and modify.

---

<div align="center">

Made with ❤️ using **Next.js** + **MongoDB** + **Framer Motion**

⭐ **Star this repo if you found it helpful!**

</div>
