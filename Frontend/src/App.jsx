import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import NewEventPage from './pages/NewEventPage';
import ShowEventsPage from './pages/ShowEventsPage';
import PrivateRoute from './components/PrivateRoute';
import UpdatePage from './Pages/UpdatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/new-event" element={<NewEventPage />} />
          <Route path="/show-events" element={<ShowEventsPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
