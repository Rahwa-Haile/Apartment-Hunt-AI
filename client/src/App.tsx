import './App.css';
import Chat from './Components/Pages/Chat';
import Navbar from './Components/Layout/Navbar';
import Register from './Components/Pages/Register';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/Apartment-Hunt-AI" element={<Chat />} />
          <Route path="/Apartment-Hunt-AI/signup" element={<Register />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
