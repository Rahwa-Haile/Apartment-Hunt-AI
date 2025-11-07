import { Request, Response } from 'express';
import OpenAI from 'openai';
import { messageSchema } from '../validators/messageSchema';
import { buildListingsQuery } from '../util/functions';
import { connectDB } from '../db/connectDB';
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
        priority: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              field: { type: 'string' },
              order: { type: ['string', 'null'], enum: ['asc', 'desc', null] },
            },
          },
        },
        inquiry: {
          type: 'boolean',
          description: 'General inquires about listings',
        },
        commute: {
          type: 'object',
          properties: {
            origin: {
              type: 'string',
              description: 'Starting point for commute',
            },
            destination: {
              type: 'string',
              description: 'End point for commute',
            },
            mode: {
              type: 'string',
              enum: ['driving', 'walking', 'bicycling', 'transit'],
              default: 'driving',
              description: 'Mode of transportation for commute',
            },
            transit_mode: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['bus', 'subway', 'train', 'tram', 'rail'],
              },
              description: 'Specific type(s) of transit if mode is transit',
              default: [], // empty array if user doesn’t specify
            },
            max_duration: {
              type: 'number',
              description: 'Maximum acceptable commute duration in minutes',
            },
            max_distance: {
              type: 'number',
              description: 'Maximum acceptable commute distance in miles',
            },
            arrival_time: {
              type: 'string',
              description: 'Desired arrival time in HH:MM format',
            },
            departure_time: {
              type: 'string',
              description: 'Desired departure time in HH:MM format',
            },
          },
        },
      },
    },
    required: [],
  },
];


export const handleApartmentQuery = async (req: Request, res: Response) => {
  try {
    const { value, error } = messageSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const input = value.content;

    let response = await client.responses.create({
      model: 'gpt-4.1',
      instructions: `You are a helpful assistant that extracts structured filters from user queries about apartment listings. Given a user query, identify and extract relevant filters such as city, state, price range, number of bedrooms, and number of bathrooms. Return the extracted information in a JSON format with the following fields: city (string), state (string), price_min (number or null), price_max (number or null), bedrooms_min (number or null), bedrooms_max (number or null), bathrooms_min (number or null), bathrooms_max (number or null). If a particular filter is not mentioned in the query, set its value to null. If the query is a general inquiry (e.g., asking about average prices or trends) rather than a request for listings, set additional field inquiry: true and ask the user to clarify the city or state before providing information.Ensure that the JSON output is properly formatted and valid.
        Rules:
          1. Assume the user is searching for apartments ONLY.
          2. Identify filters: city, state, price range, number of bedrooms, number of bathrooms, pet-friendly, parking.
          3. If the user requests features not possible in apartments (like backyard, HOA ownership, detached house), set them to null and include a 'message' field explaining which filters are ignored or not applicable.
          4. ONLY respond about apartment listings and related filters. If the user asks about anything unrelated (e.g., “what’s the weather” or “tell me a joke”), return a JSON object with "filters" set to null and a "message" field stating that you only answer apartment-related queries.
          5. Return a single, valid JSON object. Do not include any extra text outside the JSON.
          6.  If the user provides a vague or partial query (some filters are missing), do NOT decline. Instead, return the available filters and include a 'message' requesting clarification or more details for missing filters.
          7. Any filter that is explicitly mentioned by the user should be considered implicitly prioritized. Populate the "priority" array with these filters in the order they are mentioned. If a filter is not numeric (like city or state), set "order" to null. For commute filters, treat any mentioned commute constraints (max_duration, max_distance, arrival_time, departure_time) as priorities.
          8. If the user mentions commute preferences, extract commute details into a 'commute' object with fields: origin (string), destination (string), mode (string: driving, walking, bicycling, transit), max_duration (number in minutes or null), max_distance (number in miles or null), arrival_time (string in HH:MM format or null), departure_time (string in HH:MM format or null). If the user does not mention a mode, assume "driving" by default. If the user mentions any specific public-transit vehicle (e.g., "subway", "metro", "underground", "tram", "light rail", "commuter rail", "train", "bus"), always:
              - set "mode" to "transit"
              - put the specific vehicle(s) into "transit_mode" as an array of strings using these canonical tokens: ["bus","subway","train","tram","rail"]
              - normalize common synonyms to the canonical tokens (e.g., "metro" or "underground" → "subway"; "light rail" → "tram"; "commuter rail" → "rail")
              - If the user mentions commute, ask clarifying information for the destination location before returning info.
            Do NOT return vehicle names as the top-level "mode" (mode must be one of: "driving","walking","bicycling","transit").
            If the user says only "transit" or doesn't specify a vehicle, set "transit_mode" to [] (empty array).
            Return only the single JSON object described in the schema.
            If no commute details are provided, set 'commute' to null.
          `,
      tools,
      input,
    });

    const text =
      (response as any).output_text || (response as any).output?.[0]?.text;
    if (!text) return res.status(500).json({ msg: 'No JSON text in response' });

    const filtersObject = JSON.parse(text); 

    const { sql, params } = buildListingsQuery(filtersObject);

    const [rows] = await connectDB.query(sql, params);
     const listings = Array.isArray(rows) ? rows : [];

     res.setHeader('Content-Type', 'text/event-stream');
     res.setHeader('Cache-Control', 'no-cache');
     res.setHeader('Connection', 'keep-alive');
     const gptResponse = await client.responses.create({
       model: 'gpt-4.1',
       instructions: `You are a helpful apartment search assistant. Given the user's query and the matching apartment listings, provide a natural, helpful response.

      Rules:
      - Reply ina human-friendly, conversational manner
      - Summarize the results clearly ("I found X apartments matching your criteria...")
      - Mention key filters used (location, price, bedrooms, etc.)
      - If no listings found, suggest adjusting filters
      - Highlight 2-3 most relevant listings with their key features
      - Keep responses helpful but only return listings if the user requests them specifically
      - If inquiry is true, provide general information about apartment trends instead of specific listings
      - Always encourage user engagement and ask for clarification if needed
      - Include a call-to-action for more details or filter adjustments`,
       input: `User Query: "${input}"
        Filters Applied: ${JSON.stringify(filtersObject, null, 2)}
        Found ${listings.length} listings:
        ${JSON.stringify(listings.slice(0, 5), null, 2)} // Limit to top 5 for context
      `,
       stream: true,
     });


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




