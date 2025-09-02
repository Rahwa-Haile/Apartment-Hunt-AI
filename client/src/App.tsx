import './App.css';
import Chat from './Components/Pages/Chat';
import Navbar from './Components/Layout/Navbar';
import Register from './Components/Pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Apartment-Hunt-AI" element={<Chat />} />
          <Route path="/Apartment-Hunt-AI/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
