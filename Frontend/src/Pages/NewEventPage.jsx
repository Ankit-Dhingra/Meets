import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

function NewEventPage() {
  const [name, setName] = useState(''); // For event name
  const [date, setDate] = useState(''); // For event date
  const [time, setTime] = useState(''); // For event time
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.post('http://localhost:5000/api/events', 
        { title: name, description: '', date: `${date}T${time}` }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Event created successfully:', response.data);
      navigate('/home');
    } catch (err) {
      console.error('Error during POST request:', err.response ? err.response.data : err.message);
    }
  };
  

  return (
    <div>
      <NavBar />
      <div className="p-8 md:p-10 w-11/12 md:w-1/2 m-auto">
        <h1 className="text-2xl font-bold text-blue-500 mb-6 text-center">Create New Event</h1>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Event Name" 
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="w-full p-2 mb-4 border border-gray-300 rounded" 
        />
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          className="w-full p-2 mb-6 border border-gray-300 rounded" 
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white w-full p-2 rounded">Create Event</button>
      </div>
    </div>
  );
}

export default NewEventPage;
