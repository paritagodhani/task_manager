'use client';

import { motion } from 'framer-motion';
import { Task } from '@/lib/schema';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onToggle, onEdit }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const priorityColor = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  }[task.priority as string] || 'bg-gray-100 text-gray-800';

  const statusColor = {
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800',
  }[task.status as string] || 'bg-gray-100 text-gray-800';

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.id);
  };

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggle(task.id, !task.completed);
    setIsToggling(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      layout
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          <motion.input
            type="checkbox"
            checked={task.completed ?? false}
            onChange={handleToggle}
            disabled={isToggling}
            className="w-5 h-5 mt-1 cursor-pointer accent-emerald-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <div className="flex-1">
            <motion.h3
              className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {task.title}
            </motion.h3>
            {task.description && (
              <motion.p
                className="text-gray-600 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {task.description}
              </motion.p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            onClick={() => onEdit(task)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Edit
          </motion.button>
          <motion.button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
          {task.priority}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {task.status}
        </span>
        {task.dueDate && (
          <motion.span
            className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
