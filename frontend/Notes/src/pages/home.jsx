import React from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited'
import axios from 'axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import NotesItem from '../components/Notes'
import { useNavigate } from 'react-router'

const home = () => {
    const [IsRateLimited, setIsRateLimited] = React.useState(false);
    const [IsLoading, setIsLoading] = React.useState(true);
    const [Notes, setNotes] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Notes');
            console.log(response.data);
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
            
            // Check for rate limiting
            if (error.response?.status === 429) {
                setIsRateLimited(true);
                toast.error('Rate limited! Please wait before trying again.');
            } else {
                toast.error('Failed to fetch notes. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    fetchNotes();
}, []);
    
    const handleEdit = (note) => {
  navigate(`/view/${note._id}`);
};

    const handleDelete = async (noteId) => {
        if (!window.confirm('Are you sure you want to delete this note?')) {
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/Notes/${noteId}`);
            setNotes(Notes.filter(note => note._id !== noteId));
            toast.success('Note deleted successfully!');
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Failed to delete note. Please try again later.');
        }
        console.log('Deleting note:', noteId);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            {IsRateLimited && <RateLimited />}
            
            {!IsRateLimited && <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-yellow-400">Your Investigation Notes</h1>
                
                {IsLoading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Loading case files...</p>
                    </div>
                ) : Notes.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No notes found. Create your first case file!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Notes.map((note) => (
                            <NotesItem 
                                key={note._id}
                                note={note} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </div>
                )}
            </div>}
        </div>
    )
}

export default home