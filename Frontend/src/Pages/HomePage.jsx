import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
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

  // Filter events based on the selected date
  const eventsForDate = events.filter(event => new Date(event.date).toDateString() === date.toDateString());

  return (
    <div>
      <NavBar />
      <div className="p-8 m-auto">
        <h1 className="text-2xl font-bold mb-6 text-white px-4 py-1 w-fit rounded-full bg-blue-500">Your Events</h1>
        <Calendar
          className='w-11/12 md:w-5/12 m-auto border-blue-400 border-4 rounded-md' value={date} onChange={setDate} />
        <div className="mt-6">
          <h2 className="text-xl mb-4 text-blue-500 ">Events on {date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
          <ul className="space-y-4">
            {eventsForDate.map((event) => {
              // Parse the createdAt date and format it to Indian time
              const createdAtDate = new Date(event.createdAt); // Convert createdAt to Date object

              return (
                <li key={event.id} className="flex justify-between items-center bg-blue-100 p-4 rounded-lg shadow-md">
                  <span className="font-bold text-gray-800">
                    {event.title ? event.title : 'No Title'}
                  </span>
                  <span className="text-gray-600">
                    {new Date(event.date).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                  <div className="flex-none">
                    <button onClick={() => handleChange(event.id)} className="text-blue-500 hover:underline mr-4">Change</button> {/* Change button */}
                    <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:underline">Delete</button> {/* Delete button */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
