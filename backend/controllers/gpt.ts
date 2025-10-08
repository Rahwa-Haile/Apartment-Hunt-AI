import { Request, Response } from 'express';
import OpenAI from 'openai';
import { messageSchema } from '../validators/messageSchema';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.API_KEY,
});

const tools = [
  {
    type: 'function' as const,
    name: 'generate_listing_filters',
    description:
      'Extract structured filters for apartment search queries based on city, state, price, bedrooms, and bathrooms.',
    strict: false,
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name' },
        state: { type: 'string', description: 'State abbreviation' },
        price_min: { type: 'number', description: 'Minimum price' },
        price_max: { type: 'number', description: 'Maximum price' },
        bedrooms_min: { type: 'number', description: 'Minimum bedrooms' },
        bedrooms_max: { type: 'number', description: 'Maximum bedrooms' },
        bathrooms_min: { type: 'number', description: 'Minimum bathrooms' },
        bathrooms_max: { type: 'number', description: 'Maximum bathrooms' },
      },
      required: [],
    },
  },
];
export const createGPTResponse = async (req: Request, res: Response) => {
  try {
    const { value, error } = messageSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const gptResponse = await client.responses.create({
      model: 'gpt-4.1',
      input: value.content,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const event of gptResponse) {
      if (event.type == 'response.output_text.delta') {
        res.write(`data: ${event.delta}\n\n`);
      }
    }
    res.end();
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};

export const createGPTFilters = async (req: Request, res: Response) => {
  try {
    const { value, error } = messageSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const input = value.content;

    let response = await client.responses.create({
      model: 'gpt-4.1',
      instructions:
        'You are a helpful assistant that extracts structured filters from user queries about apartment listings. Given a user query, identify and extract relevant filters such as city, state, price range, number of bedrooms, and number of bathrooms. Return the extracted information in a JSON format with the following fields: city (string), state (string), price_min (number or null), price_max (number or null), bedrooms_min (number or null), bedrooms_max (number or null), bathrooms_min (number or null), bathrooms_max (number or null). If a particular filter is not mentioned in the query, set its value to null. Ensure that the JSON output is properly formatted and valid.',
      tools,
      input,
    });

    res.status(200).json(response.output);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
