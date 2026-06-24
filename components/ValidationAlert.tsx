'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ValidationAlertProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose?: () => void;
}

export const ValidationAlert: React.FC<ValidationAlertProps> = ({ message, type, onClose }) => {
  const colors = {
    error: 'bg-red-50 border-red-300 text-red-800',
    success: 'bg-green-50 border-green-300 text-green-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  };

  const icons = {
    error: '❌',
    success: '✅',
    info: 'ℹ️',
  };

  React.useEffect(() => {
    if (type === 'success' && onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-center gap-3 p-4 border-2 rounded-lg ${colors[type]}`}
    >
      <span className="text-xl">{icons[type]}</span>
      <span className="font-medium flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-lg hover:opacity-70">
          ✕
        </button>
      )}
    </motion.div>
  );
};
