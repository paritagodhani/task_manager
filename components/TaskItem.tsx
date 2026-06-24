'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Completed';
  dueDate: string;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const isCompleted = task.status === 'Completed';

  const priorityStyle = {
    Low: { bg: '#e6f4ea', color: '#2d6a4f', border: '#95d5b2' },
    Medium: { bg: '#fff8e1', color: '#b45309', border: '#fcd34d' },
    High: { bg: '#fee2e2', color: '#991b1b', border: '#fca5a5' },
  };

  const p = priorityStyle[task.priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
      style={{
        background: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        border: '1px solid #e8eaf0',
      }}
    >
      {/* ✅ Checkbox */}
      <div
        onClick={() => onToggleComplete(task.id, !isCompleted)}
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: 6,
          border: isCompleted ? 'none' : '2px solid #bdc3cc',
          background: isCompleted ? '#2563eb' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {isCompleted && (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M2 6.5L5 9.5L11 3.5"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: isCompleted ? '#9ca3af' : '#111827',
            textDecoration: isCompleted ? 'line-through' : 'none',
            marginBottom: 4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {task.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 13,
            color: '#6b7280',
            marginBottom: 10,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {task.description}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {/* Priority */}
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 12px',
              borderRadius: 20,
              border: `1.5px solid ${p.border}`,
              background: p.bg,
              color: p.color,
            }}
          >
            {task.priority} Priority
          </span>

          {/* Status */}
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 12px',
              borderRadius: 20,
              background: '#f3f4f6',
              color: '#374151',
              textDecoration: isCompleted ? 'line-through' : 'none',
            }}
          >
            {task.status}
          </span>

          {/* Due Date */}
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: '3px 12px',
              borderRadius: 20,
              background: '#f3e8ff',
              color: '#7c3aed',
            }}
          >
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(task)}
          style={{
            padding: '9px 20px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ✏️ Edit
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (confirm('Are you sure you want to delete this task?')) {
              onDelete(task.id);
            }
          }}
          style={{
            padding: '9px 20px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          🗑️ Delete
        </motion.button>
      </div>
    </motion.div>
  );
};
