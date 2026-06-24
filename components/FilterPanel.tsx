'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FilterPanelProps {
  priorityFilter: string;
  statusFilter: string;
  onPriorityChange: (priority: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
  onReset,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 shadow-md"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Filter Tasks</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            By Priority:
          </label>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white cursor-pointer transition-colors"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            By Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 bg-white cursor-pointer transition-colors"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </motion.div>

        <motion.div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            &nbsp;
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
          >
            🔄 Reset Filters
          </motion.button>
        </motion.div>
      </div>

      {(priorityFilter || statusFilter) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-blue-700 mt-3 font-medium"
        >
          Filters Applied: {priorityFilter && `Priority: ${priorityFilter}`}
          {priorityFilter && statusFilter && ', '}
          {statusFilter && `Status: ${statusFilter}`}
        </motion.p>
      )}
    </motion.div>
  );
};
