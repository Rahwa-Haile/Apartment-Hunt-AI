import { Request, Response } from 'express';
import OpenAI from 'openai';
import { messageSchema } from '../validators/messageSchema';
import dotenv from 'dotenv';

dotenv.config();

export const createGPTResponse = async (req: Request, res: Response) => {
  try {
    const { value, error } = messageSchema.validate(req.body);
   
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const client = new OpenAI({
      apiKey: process.env.API_KEY,
    });

    const gptResponse = await client.responses.create({
      model: 'gpt-4.1',
      input: value.content,
      stream: true,
    });
   
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    for await (const event of gptResponse){
        if(event.type=='response.output_text.delta'){
            res.write(`data: ${event.delta}\n\n`)
        }
    }
    res.end()
   
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
