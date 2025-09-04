import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { connectDB } from '../db/connectDB';
import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';

dotenv.config();

type User = RowDataPacket & {
  userId: number;
  email: string;
  password: string;
  createdAt: Date;
};
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ msg: 'provide both email and password' });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = await connectDB.query(
      `
                  INSERT INTO Users (email, password) VALUES (?,?)
              `,
      [email, hashedPassword]
    );

    res.status(200).json({ user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ msg: 'provide both email and password' });
    }

    const [rows] = await connectDB.query<User[]>(
      `Select * from Users WHERE email=?`,
      [email]
    );
    if (!rows[0]) {
      return res.status(401).json({ message: 'user doesnt exist' });
    }
    console.log(rows[0].userId);

    const isMatch = await bcryptjs.compare(password, rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'password incorrect' });
    }

    res.status(200).json({ rows });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
