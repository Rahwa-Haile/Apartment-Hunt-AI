import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';
import { connectDB } from '../db/connectDB';
import { authSchema } from '../validators/authSchema';
import jwt from 'jsonwebtoken';

dotenv.config();

type User = RowDataPacket & {
  userId: number;
  email: string;
  password: string;
  createdAt: Date;
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const { value, error } = authSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { email, password } = value;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await connectDB.query(
      `
                  INSERT INTO Users (email, password) VALUES (?,?)
              `,
      [email, hashedPassword]
    );

    res.status(201).json({ msg: 'user created' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { value, error } = authSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { email, password } = value;
    const [rows] = await connectDB.query<User[]>(
      `Select * from Users WHERE email=?`,
      [email]
    );
    if (!rows[0]) {
      return res.status(401).json({ message: 'user doesnt exist' });
    }

    const isMatch = await bcryptjs.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'password incorrect' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ msg: 'jwt secret not set' });
    }
    const token = jwt.sign(
      { userId: rows[0].userId, email: rows[0].email },
      secret,
      {
        expiresIn: '30d',
      }
    );

    res
      .status(200)
      .json({ msg: `successfully logged in userId, ${rows[0].userId}`, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
