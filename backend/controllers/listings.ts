import { Request, Response } from 'express';
import { connectDB } from '../db/connectDB';

import { buildListingsQuery } from '../util/functions';

export const getFilteredListings = async (req: Request, res: Response) => {
  try {
    const {
      city,
      state,
      price_min,
      price_max,
      bedrooms_min,
      bedrooms_max,
      bathrooms_min,
      bathrooms_max,
    } = req.body as ListingFilters;

    const { sql, params } = buildListingsQuery({
      city,
      state,
      price_min,
      price_max,
      bedrooms_min,
      bedrooms_max,
      bathrooms_min,
      bathrooms_max,
    });
    const [rows] = await connectDB.query(sql, params);

    return res.status(200).json({
      filters: {
        city,
        state,
        price_min,
        price_max,
        bedrooms_min,
        bedrooms_max,
        bathrooms_min,
        bathrooms_max,
      },
      count: Array.isArray(rows) ? rows.length : 0,
      listings: rows,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ msg: err.message });
    }
    return res.status(500).json({ msg: 'Unknown error' });
  }
};
