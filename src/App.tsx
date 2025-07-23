import './App.css';
import OpenAI from 'openai';
import {useEffect} from "react"


const client = new OpenAI();
function App() {
  
  useEffect(() =>{
    const loadGPT = async () => {
      const response = await client.responses.create({
        model: 'gpt-4.1',
        input: 'Write a one-sentence bedtime story about a unicorn.',
      })
    }
  },[]);

 

  console.log(response.output_text);
  return <div> Hello World </div>;
}

export default App;
