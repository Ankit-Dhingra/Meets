import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../components/NavBar';

function ShowEventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/events/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('API Response:', res.data); // Debugging response
        setEvents(res.data);
      } catch (err) {
        if (err.response) {
          console.error('Error fetching events:', err.response.data);
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Event not found.'}`);
        } else if (err.request) {
          console.error('Error fetching events: No response received');
          setError('No response from server. Please check if it is running.');
        } else {
          console.error('Error:', err.message);
          setError('Failed to fetch events. Please try again.');
        }
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(events.filter(event => event.id !== eventId)); // Remove deleted event from state
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  const handleChange = (eventId) => {
    // Navigate to the update page with the event ID
    navigate(`/update/${eventId}`); // Use navigate to go to the update page
  };

  return (
    <div>
      <NavBar />
      <div className="p-8">
    <h1 className="text-2xl font-bold mb-6 text-blue-500">Your Events</h1>
    {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
    <ul className="space-y-4"> {/* Add spacing between event items */}
        {events.map((event) => (
            <li key={event.id} className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-md">
                {/* Event Title */}
                <span className="font-bold text-lg text-gray-700 flex-1">{event.title ? event.title : 'No Title'}</span> {/* Display event title */}
                <span  className="hidden md:flex text-gray-600 justify-center text-center flex-1">
                    {new Date(event.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })} 
                    {' '}
                    {new Date(event.date).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </span> {/* Display event date and time */}
                <span className="flex md:hidden text-gray-600 text-center">
                    {new Date(event.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })} 
                    {' '}
                    {new Date(event.date).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                </span> {/* Display event date and time */}
                
                {/* Buttons */}
                <div className="flex-none">
                    <button onClick={() => handleChange(event.id)} className="text-blue-500 hover:underline mr-4">Change</button> {/* Change button */}
                    <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:underline">Delete</button> {/* Delete button */}
                </div>
            </li>
        ))}
    </ul>
</div>

    </div>
  );
}

export default ShowEventsPage;