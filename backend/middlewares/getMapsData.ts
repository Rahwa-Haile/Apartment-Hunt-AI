import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const data = async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=San%20Francisco%7CVictoria%20BC&language=fr-FR&mode=bicycling&origins=Vancouver%20BC%7CSeattle&key=${process.env.DISTANCE_MATRIX_API}`, );
  const result = await response.json();
  console.log(result);  
}
data() 