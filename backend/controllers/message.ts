import { Request, Response } from 'express';
import { connectDB } from '../db/connectDB';

export const createMessage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'unauthorized' });
    }
    const { role, content } = req.body;
    const { chatId } = req.params;
    await connectDB.query(
      `INSERT INTO Messages (role, content, chatId) VALUES (?,?,?)`,
      [role, content, chatId]
    );

    res.status(201).json({ msg: 'message is saved' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const getAllMessage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'unauthorized' });
    }
    const { chatId } = req.params;
    const [messages] = await connectDB.query(
      `SELECT * FROM Messages WHERE chatId=(?)`,
      [chatId]
    );

    res.status(200).json({ messages });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const getMessage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'unauthorized' });
    }
    const { chatId, id } = req.params;
    const message = await connectDB.query(
      `SELECT * FROM Messages WHERE chatId=(?) AND messageId=(?)`,
      [chatId, id]
    );
    res.status(200).json(message)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
