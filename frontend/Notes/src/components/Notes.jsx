import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Clock, FileText } from 'lucide-react';

const Notes = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-200 
                 border-4 border-yellow-400 rounded-lg p-6 shadow-lg 
                 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* TV Static Background Effect */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.1) 0%, transparent 50%)
          `,
          backgroundSize: '50px 50px, 40px 40px'
        }}
      />

      {/* Chromatic Aberration Border Effect */}
      <div className="absolute inset-0 border-4 border-red-400 rounded-lg transform translate-x-0.5 opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 border-4 border-blue-400 rounded-lg transform -translate-x-0.5 opacity-15 pointer-events-none"></div>

      {/* Header with Title and Actions */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center space-x-2 flex-1">
          <div className="bg-black p-1.5 rounded-lg shadow-md">
            <FileText className="h-5 w-5 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-black truncate relative">
            <span className="relative z-10">{note.title || 'Untitled Note'}</span>
            {/* Text chromatic aberration */}
            <span className="absolute top-0 left-0 text-red-600 transform translate-x-0.5 opacity-20">
              {note.title || 'Untitled Note'}
            </span>
            <span className="absolute top-0 left-0 text-blue-600 transform -translate-x-0.5 opacity-15">
              {note.title || 'Untitled Note'}
            </span>
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 ml-4">
          <motion.button
            onClick={() => onEdit(note)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg 
                     shadow-md border-2 border-blue-600 relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Button chromatic aberration */}
            <div className="absolute inset-0 bg-red-500 transform translate-x-0.5 opacity-20"></div>
            <div className="absolute inset-0 bg-yellow-500 transform -translate-x-0.5 opacity-15"></div>
            <Edit3 className="h-4 w-4 relative z-10" />
          </motion.button>

          <motion.button
            onClick={() => onDelete(note._id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg 
                     shadow-md border-2 border-red-600 relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Button chromatic aberration */}
            <div className="absolute inset-0 bg-blue-500 transform translate-x-0.5 opacity-20"></div>
            <div className="absolute inset-0 bg-yellow-500 transform -translate-x-0.5 opacity-15"></div>
            <Trash2 className="h-4 w-4 relative z-10" />
          </motion.button>
        </div>
      </div>

      {/* Note Content */}
      <div className="mb-4 relative z-10">
        <p className="text-gray-800 text-base leading-relaxed line-clamp-4">
          {note.content || note.message || 'No content available'}
        </p>
      </div>

      {/* Footer with Timestamp */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-yellow-500 relative z-10">
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">
            {formatDate(note.createdAt || note.timestamp || new Date())}
          </span>
        </div>

        {/* Investigation Badge */}
        <div className="bg-black text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border-2 border-yellow-400">
          CASE FILE
        </div>
      </div>

      {/* Hover Glitch Effect */}
      <motion.div
        className="absolute inset-0 bg-red-500 opacity-0 rounded-lg pointer-events-none"
        animate={{
          opacity: [0, 0.1, 0],
          x: [0, 1, -1, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          when: "hover"
        }}
      />
    </motion.div>
  );
};

export default Notes;