'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function Toast({ message, onClose }: { message: ToastMessage; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[message.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg`}
    >
      {message.message}
    </motion.div>
  );
}

export function ToastContainer({ messages, onRemove }: { messages: ToastMessage[]; onRemove: (id: string) => void }) {
  return (
    <AnimatePresence>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {messages.map((msg) => (
          <Toast key={msg.id} message={msg} onClose={() => onRemove(msg.id)} />
        ))}
      </div>
    </AnimatePresence>
  );
}
