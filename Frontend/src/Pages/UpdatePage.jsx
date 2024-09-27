import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function UpdatePage() {
  const { id } = useParams(); // Get the event ID from the URL
  const [name, setName] = useState(''); // For event name
  const [date, setDate] = useState(''); // For event date
  const [time, setTime] = useState(''); // For event time
  const navigate = useNavigate();

  // Fetch existing event data when the component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const eventData = response.data;
        setName(eventData.title); // Set previous name
        setDate(eventData.date.split('T')[0]); // Set previous date
        setTime(eventData.date.split('T')[1].substring(0, 5)); // Set previous time
      } catch (err) {
        console.error('Error fetching event data:', err.response ? err.response.data : err.message);
      }
    };

    fetchEventData();
  }, [id]);

  // Handle form submission for updating the event
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        await axios.put(`http://localhost:5000/api/events/${id}`,
            { title: name, date: `${date}T${time}` },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Event updated successfully');
        alert('Event updated successfully');
        navigate('/show-events'); // Redirect after successful update
    } catch (err) {
        console.error('Error during PUT request:', err.response ? err.response.data : err.message);
    }
};
    return (

        <div>
            <NavBar />
            <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center mt-10">Update Event</h1>
            <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Event Title:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Time:</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
                    >
                        Update Event
                    </button>
                </form>
            </div>

        </div>

    );
};

export default UpdatePage;