import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv, Save, ArrowLeft, FileText, Clock, Edit3, Trash2, AlertTriangle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const view = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [originalNote, setOriginalNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch note data on component mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Notes/${id}`);
        const note = response.data;
        setOriginalNote(note);
        setTitle(note.title);
        setContent(note.content);
      } catch (error) {
        console.error('Error fetching note:', error);
        toast.error('Failed to load case file');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNote();
    }
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSaving(true);
    
    try {
      await axios.put(`http://localhost:5000/Notes/${id}`, {
        Header: title.trim(),
        Content: content.trim()
      });
      
      toast.success('Case file updated successfully!');
      setIsEditing(false);
      // Update original note for comparison
      setOriginalNote({ ...originalNote, title: title.trim(), content: content.trim() });
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update case file');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this case file? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    
    try {
      await axios.delete(`http://localhost:5000/Notes/${id}`);
      toast.success('Case file deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete case file');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setTitle(originalNote.title);
    setContent(originalNote.content);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-white text-xl">Loading case file...</div>
        </div>
      </div>
    );
  }

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
              <FileText className="h-12 w-12 text-black" />
              {/* Chromatic aberration */}
              <FileText className="h-12 w-12 text-red-500 absolute top-4 left-4 transform translate-x-1 opacity-40" />
              <FileText className="h-12 w-12 text-blue-500 absolute top-4 left-4 transform -translate-x-1 opacity-30" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 relative">
            <span className="relative z-10">CASE FILE REVIEW</span>
            {/* Text chromatic aberration */}
            <span className="absolute top-0 right-80 text-red-500 transform translate-x-1 opacity-30">
              CASE FILE REVIEW
            </span>
            <span className="absolute top-0 right-80 text-blue-500 transform -translate-x-1 opacity-25">
              CASE FILE REVIEW
            </span>
          </h1>
          
          <p className="text-gray-300">
            {isEditing ? 'Updating investigation details' : 'Reviewing investigation findings'}
          </p>
        </motion.div>

        {/* Case File Info */}
        {originalNote && (
          <motion.div
            className="bg-black bg-opacity-50 border-2 border-yellow-400 rounded-lg p-4 mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-300">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">Created: {formatDate(originalNote.createdAt)}</span>
              </div>
              {originalNote.updatedAt && originalNote.updatedAt !== originalNote.createdAt && (
                <div className="flex items-center space-x-2">
                  <Edit3 className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm">Last Updated: {formatDate(originalNote.updatedAt)}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Main Content Container */}
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

          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleUpdate} className="relative z-10">
              {/* Title Field */}
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-lg font-bold text-black mb-3">
                  <FileText className="h-5 w-5" />
                  <span>Case Title</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 text-lg border-3 border-black rounded-lg 
                           bg-white focus:border-yellow-500 focus:outline-none 
                           transition-colors shadow-md"
                  required
                />
              </div>

              {/* Content Field */}
              <div className="mb-8">
                <label className="flex items-center space-x-2 text-lg font-bold text-black mb-3">
                  <Edit3 className="h-5 w-5" />
                  <span>Investigation Details</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 text-lg border-3 border-black rounded-lg 
                           bg-white focus:border-yellow-500 focus:outline-none 
                           transition-colors shadow-md resize-vertical"
                  required
                />
              </div>

              {/* Edit Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg 
                           shadow-lg border-2 border-gray-700 flex items-center space-x-2 
                           transition-all duration-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Cancel</span>
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={isSaving}
                  className={`font-bold py-3 px-6 rounded-lg shadow-lg border-2 
                            flex items-center space-x-2 transition-all duration-200 
                            relative overflow-hidden
                            ${isSaving 
                              ? 'bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-700'
                            }`}
                  whileHover={!isSaving ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isSaving ? { scale: 0.95 } : {}}
                >
                  <Save className="h-5 w-5" />
                  <span>{isSaving ? 'Updating...' : 'Update Case'}</span>
                </motion.button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <div className="relative z-10">
              {/* Title Display */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-2">{title}</h2>
                <div className="w-full h-1 bg-black rounded"></div>
              </div>

              {/* Content Display */}
              <div className="mb-8">
                <div className="bg-white border-3 border-black rounded-lg p-4 shadow-md">
                  <pre className="whitespace-pre-wrap text-gray-800 font-sans text-base leading-relaxed">
                    {content}
                  </pre>
                </div>
              </div>

              {/* View Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Link to="/">
                  <motion.button
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg 
                             shadow-lg border-2 border-gray-700 flex items-center space-x-2 
                             transition-all duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Files</span>
                  </motion.button>
                </Link>

                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg 
                             shadow-lg border-2 border-blue-700 flex items-center space-x-2 
                             transition-all duration-200 relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-yellow-500 transform translate-x-0.5 opacity-15"></div>
                    <Edit3 className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Edit Case</span>
                  </motion.button>

                  <motion.button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className={`font-bold py-3 px-6 rounded-lg shadow-lg border-2 
                              flex items-center space-x-2 transition-all duration-200 
                              relative overflow-hidden
                              ${isDeleting 
                                ? 'bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed' 
                                : 'bg-red-600 hover:bg-red-700 text-white border-red-700'
                              }`}
                    whileHover={!isDeleting ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isDeleting ? { scale: 0.95 } : {}}
                  >
                    {!isDeleting && (
                      <>
                        <div className="absolute inset-0 bg-blue-500 transform translate-x-0.5 opacity-20"></div>
                        <div className="absolute inset-0 bg-yellow-500 transform -translate-x-0.5 opacity-15"></div>
                      </>
                    )}
                    <Trash2 className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">
                      {isDeleting ? 'Deleting...' : 'Delete Case'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Warning Notice */}
        <motion.div
          className="mt-8 bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-lg p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold text-sm">
              Warning: Deleted case files cannot be recovered. Handle with care.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default view;