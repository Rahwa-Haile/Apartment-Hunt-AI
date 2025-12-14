import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

  type TokenPayload = JwtPayload & {
    userId: number;
    email: string;
  };


declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authentication = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization as string;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'bad request' });
      }

      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({ msg: 'jwt secret not set' });
      }
      const decoded = jwt.verify(token, secret);
      req.user = decoded as TokenPayload;

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
  };
};
