import './App.css';
import Chat from './Components/Pages/Chat';
import Navbar from './Components/Layout/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Apartment-Hunt-AI" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
