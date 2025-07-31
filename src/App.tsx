import './App.css';
import OpenAI from 'openai';
import Chat from './Components/Pages/Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});
async function loadGPT() {
  console.log('calling openai');
  const response = await client.responses.create({
    model: 'gpt-4.1',
    input: 'apartment listings"',
  });

  console.log(response.output_text);
}
// loadGPT();
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Apartment-Hunt-AI" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
