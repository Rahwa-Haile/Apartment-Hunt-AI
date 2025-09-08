import { Request, Response } from 'express';
import { connectDB } from '../db/connectDB';

export const createChat = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!req.user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const { userId } = req.user;

    await connectDB.query(`INSERT INTO Chats (title, userId) VALUES (?,?)`, [
      title,
      userId,
    ]);
    res.status(201).json({ msg: 'chat is saved' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const getAllChat = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'unauthorized' });
    }
    const { userId } = req.user;
    const userChats = await connectDB.query(
      `SELECT * from Chats WHERE (userId=?)`,
      [userId]
    );

    res.status(200).json({ userChats });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const getChat = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'unauthorized' });
    }
    const { userId } = req.user;
    const { chatId } = req.params;

    const chat = await connectDB.query(
      `SELECT * FROM Chats WHERE chatId=? AND userId=?`,
      [chatId, userId]
    );

    res.status(200).json({ chat });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const deleteChat = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const { userId } = req.user;
    const { chatId } = req.params;

    await connectDB.query(`DELETE FROM Chats WHERE chatId=? AND userId=?`, [
      chatId,
      userId,
    ]);
    res.status(200).json({ msg: 'chat deleted' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
