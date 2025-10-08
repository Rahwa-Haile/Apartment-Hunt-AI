import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    listings?: any;
  }
}
export const listings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url =
      'https://api.rentcast.io/v1/listings/rental/long-term?state=OH&city=Dublin&propertyType=apartment&status=active';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Api-Key': process.env.RENT_API as string,
      },
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(
        `RentCast error: ${response.status} ${response.statusText}`
      );
    }

    req.listings = await response.json();
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
  }
};
