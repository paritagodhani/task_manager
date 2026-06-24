'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskItem, Task } from '@/components/TaskItem';
import { TaskFormSimple } from '@/components/TaskFormSimple';
import { FilterPanel } from '@/components/FilterPanel';
import { Modal } from '@/components/Modal';
import { ValidationAlert } from '@/components/ValidationAlert';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tasks from MongoDB via API
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (priorityFilter) params.append('priority', priorityFilter);
      if (statusFilter) params.append('status', statusFilter);

      const res = await fetch(`/api/tasks?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        // Map _id → id (as plain string) for compatibility with components
        const mapped = json.data.map((t: any) => ({
          ...t,
          id: t._id?.toString() || t._id,
        }));
        setFilteredTasks(mapped);
        setTasks(mapped);
      } else {
        setErrorMessage(json.message || 'Failed to load tasks');
      }
    } catch (err) {
      setErrorMessage('Could not connect to database. Is MongoDB running?');
    } finally {
      setIsLoading(false);
    }
  }, [priorityFilter, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const json = await res.json();

      if (json.success) {
        setIsModalOpen(false);
        setSuccessMessage(`✅ Task "${taskData.title}" created successfully!`);
        fetchTasks();
      } else {
        const errs = json.errors?.join(', ') || json.message || 'Failed to create task';
        setErrorMessage(`❌ ${errs}`);
      }
    } catch {
      setErrorMessage('❌ Network error. Please try again.');
    }
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;

    try {
      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const json = await res.json();

      if (json.success) {
        setIsModalOpen(false);
        setEditingTask(undefined);
        setSuccessMessage(`✅ Task "${taskData.title}" updated successfully!`);
        fetchTasks();
      } else {
        setErrorMessage(`❌ ${json.message || 'Failed to update task'}`);
      }
    } catch {
      setErrorMessage('❌ Network error. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (json.success) {
        setSuccessMessage(`✅ Task "${task?.title}" deleted successfully!`);
        fetchTasks();
      } else {
        setErrorMessage(`❌ ${json.message || 'Failed to delete task'}`);
      }
    } catch {
      setErrorMessage('❌ Network error. Please try again.');
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const task = tasks.find((t) => t.id === id);
    const newStatus = completed ? 'Completed' : 'Pending';

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();

      if (json.success) {
        setSuccessMessage(
          `✅ Task "${task?.title}" marked as ${completed ? 'completed' : 'pending'}!`
        );
        fetchTasks();
      } else {
        setErrorMessage(`❌ ${json.message || 'Failed to update task'}`);
      }
    } catch {
      setErrorMessage('❌ Network error. Please try again.');
    }
  };

  const handleResetFilters = () => {
    setPriorityFilter('');
    setStatusFilter('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    highPriority: tasks.filter((t) => t.priority === 'High').length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            📋 Task Manager Pro
          </h1>
          <p className="text-lg text-gray-600">Organize your work with ease and style</p>
          <p className="text-sm text-green-600 mt-1 font-medium">🍃 Powered by MongoDB</p>
        </motion.div>

        {/* Alerts */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <ValidationAlert
                type="success"
                message={successMessage}
                onClose={() => setSuccessMessage('')}
              />
            </motion.div>
          )}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <ValidationAlert
                type="error"
                message={errorMessage}
                onClose={() => setErrorMessage('')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingTask(undefined);
              setIsModalOpen(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            ✨ Create New Task
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <FilterPanel
            priorityFilter={priorityFilter}
            statusFilter={statusFilter}
            onPriorityChange={setPriorityFilter}
            onStatusChange={setStatusFilter}
            onReset={handleResetFilters}
          />
        </motion.div>

        {/* Stats */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Tasks', value: stats.total, color: 'from-blue-500 to-blue-600' },
              { label: 'Pending', value: stats.pending, color: 'from-yellow-500 to-yellow-600' },
              { label: 'Completed', value: stats.completed, color: 'from-green-500 to-green-600' },
              { label: 'High Priority', value: stats.highPriority, color: 'from-red-500 to-red-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-r ${stat.color} p-4 rounded-lg shadow-md text-white text-center`}
              >
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-12 rounded-xl shadow-md text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-5xl mb-4 inline-block"
              >
                ⚙️
              </motion.div>
              <p className="text-xl text-gray-500">Loading tasks from MongoDB...</p>
            </motion.div>
          ) : filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-12 rounded-xl shadow-md text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                📭
              </motion.div>
              <p className="text-xl text-gray-600 font-semibold">
                {priorityFilter || statusFilter
                  ? 'No tasks match your filters'
                  : 'No tasks yet. Click "Create New Task" to get started!'}
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <TaskItem
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingTask ? '✏️ Edit Task' : '✨ Add New Task'}
        onClose={handleCloseModal}
      >
        <TaskFormSimple
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        />
      </Modal>
    </main>
  );
}
