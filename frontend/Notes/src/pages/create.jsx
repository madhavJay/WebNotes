import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tv, Save, ArrowLeft, FileText, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/Notes', {
        Header: title.trim(),
        Content: content.trim()
      });
      
      toast.success('Case file created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create case file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 p-4 rounded-2xl shadow-2xl border-4 border-yellow-500 relative">
              <Tv className="h-12 w-12 text-black" />
              {/* Chromatic aberration */}
              <Tv className="h-12 w-12 text-red-500 absolute top-4 left-4 transform translate-x-1 opacity-40" />
              <Tv className="h-12 w-12 text-blue-500 absolute top-4 left-4 transform -translate-x-1 opacity-30" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 relative">
            <span className="relative z-10">NEW CASE FILE</span>
            {/* Text chromatic aberration */}
            <span className="absolute top-0 right-80 text-red-500 transform translate-x-1 opacity-30">
              NEW CASE FILE
            </span>
            <span className="absolute top-0 right-80 text-blue-500 transform -translate-x-1 opacity-25">
              NEW CASE FILE
            </span>
          </h1>
          
          <p className="text-gray-300">Document your investigation findings</p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-200 
                     border-4 border-yellow-400 rounded-lg p-8 shadow-2xl 
                     relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Background Effects */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0,0,0,0.1) 0%, transparent 50%)
              `,
              backgroundSize: '100px 100px, 80px 80px'
            }}
          />

          {/* Chromatic aberration borders */}
          <div className="absolute inset-0 border-4 border-red-400 rounded-lg transform translate-x-1 opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 border-4 border-blue-400 rounded-lg transform -translate-x-1 opacity-15 pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="relative z-10">
            {/* Title Field */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <label className="flex items-center space-x-2 text-lg font-bold text-black mb-3">
                <FileText className="h-5 w-5" />
                <span>Case Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter investigation title..."
                className="w-full px-4 py-3 text-lg border-3 border-black rounded-lg 
                         bg-white focus:border-yellow-500 focus:outline-none 
                         transition-colors shadow-md"
                required
              />
            </motion.div>

            {/* Content Field */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label className="flex items-center space-x-2 text-lg font-bold text-black mb-3">
                <Clock className="h-5 w-5" />
                <span>Investigation Details</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Document your findings, evidence, and observations..."
                rows={8}
                className="w-full px-4 py-3 text-lg border-3 border-black rounded-lg 
                         bg-white focus:border-yellow-500 focus:outline-none 
                         transition-colors shadow-md resize-vertical"
                required
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link to="/">
                <motion.button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg 
                           shadow-lg border-2 border-gray-700 flex items-center space-x-2 
                           transition-all duration-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Cancel Investigation</span>
                </motion.button>
              </Link>

              <motion.button
                type="submit"
                disabled={isLoading}
                className={`font-bold py-3 px-6 rounded-lg shadow-lg border-2 
                          flex items-center space-x-2 transition-all duration-200 
                          relative overflow-hidden
                          ${isLoading 
                            ? 'bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed' 
                            : 'bg-black hover:bg-gray-800 text-yellow-400 border-yellow-400 hover:border-yellow-300'
                          }`}
                whileHover={!isLoading ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
              >
                {!isLoading && (
                  <>
                    <div className="absolute inset-0 bg-red-600 transform translate-x-0.5 opacity-15"></div>
                    <div className="absolute inset-0 bg-blue-600 transform -translate-x-0.5 opacity-10"></div>
                  </>
                )}
                
                <Save className="h-5 w-5 relative z-10" />
                <span className="relative z-10">
                  {isLoading ? 'Saving Case File...' : 'Save Case File'}
                </span>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Investigation Tips */}
        <motion.div
          className="mt-8 bg-black bg-opacity-50 border-2 border-yellow-400 rounded-lg p-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <h3 className="text-yellow-400 font-bold text-lg mb-3">Investigation Tips:</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Be detailed in your observations - every clue matters</li>
            <li>• Include timestamps and locations when relevant</li>
            <li>• Note any suspicious behavior or anomalies</li>
            <li>• Cross-reference with previous case files</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default create;