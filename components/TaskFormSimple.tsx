'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from './TaskItem';
import { ValidationAlert } from './ValidationAlert';

interface TaskFormSimpleProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  initialData?: Task;
  isLoading?: boolean;
}

export const TaskFormSimple: React.FC<TaskFormSimpleProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: (initialData?.priority || 'Medium') as 'Low' | 'Medium' | 'High',
    status: (initialData?.status || 'Pending') as 'Pending' | 'Completed',
    dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
  });

  const [validation, setValidation] = useState<{
    type: 'error' | 'success' | 'info';
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setValidation({ type: 'error', message: '❌ Title is required!' });
      return false;
    }

    if (formData.title.trim().length < 3) {
      setValidation({ type: 'error', message: '❌ Title must be at least 3 characters!' });
      return false;
    }

    if (!formData.description.trim()) {
      setValidation({ type: 'error', message: '❌ Description is required!' });
      return false;
    }

    if (formData.description.trim().length < 10) {
      setValidation({ type: 'error', message: '❌ Description must be at least 10 characters!' });
      return false;
    }

    if (!formData.dueDate) {
      setValidation({ type: 'error', message: '❌ Due date is required!' });
      return false;
    }

    const dueDate = new Date(formData.dueDate);
    if (dueDate < new Date()) {
      setValidation({ type: 'error', message: '❌ Due date cannot be in the past!' });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
    setValidation({
      type: 'success',
      message: `✅ ${initialData ? 'Task updated' : 'Task created'} successfully!`,
    });

    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Pending',
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AnimatePresence>
        {validation && (
          <ValidationAlert
            type={validation.type}
            message={validation.message}
            onClose={() => setValidation(null)}
          />
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Task Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (min 10 characters)"
          rows={4}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Priority *
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Due Date *
        </label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors shadow-lg"
      >
        {isLoading ? 'Saving...' : initialData ? '💾 Update Task' : '✨ Create Task'}
      </motion.button>
    </form>
  );
};
