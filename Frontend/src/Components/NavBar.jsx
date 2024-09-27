import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 px-4 py-3 text-white flex items-center">
  <a href="/home">
    {/* Hide the title in mobile view */}
    <h1 className="text-white text-3xl italic font-semibold hidden md:block">Meets</h1>
  </a>
  <div className="flex-grow"></div>
  
  {/* Capsule container for mobile view */}
  <div className="bg-blue-700 backdrop-blur-sm text-white-600 px-6 py-2 rounded-full hidden md:flex">
    <ul className="flex justify-center gap-16">
      <li><a href="/home" className="hover:underline">Home</a></li>
      <li><a href="/new-event" className="hover:underline">New Event</a></li>
      <li><a href="/show-events" className="hover:underline">All Events</a></li>
    </ul>
  </div>

  {/* Capsule for mobile view */}
  <div className="md:hidden flex bg-blue-700 backdrop-blur-sm text-white-600 px-4 py-2 rounded-full">
    <ul className="flex justify-between gap-4 w-full">
      <li><a href="/home" className="hover:underline">Home</a></li>
      <li><a href="/new-event" className="hover:underline">New Event</a></li>
      <li><a href="/show-events" className="hover:underline">All Events</a></li>
      <li><a onClick={handleSignOut} className="hover:underline">Sign Out</a></li>
    </ul>
  </div>

  <div className="flex-grow"></div>
  
  {/* Sign Out button for larger screens */}
  <a className="hidden md:block">
    <button onClick={handleSignOut} className="hover:underline">Sign Out</button>
  </a>
</nav>



  );
}

export default NavBar;
