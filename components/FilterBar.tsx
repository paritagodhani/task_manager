'use client';

import { motion } from 'framer-motion';

interface FilterBarProps {
  selectedPriority: string;
  selectedStatus: string;
  onPriorityChange: (priority: string) => void;
  onStatusChange: (status: string) => void;
}

export function FilterBar({
  selectedPriority,
  selectedStatus,
  onPriorityChange,
  onStatusChange,
}: FilterBarProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const filterButtons = [
    { label: 'All', value: '' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  const statusButtons = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <motion.div variants={item} className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Priority</h3>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((btn) => (
            <motion.button
              key={btn.value}
              onClick={() => onPriorityChange(btn.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPriority === btn.value
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusButtons.map((btn) => (
            <motion.button
              key={btn.value}
              onClick={() => onStatusChange(btn.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedStatus === btn.value
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
