import express from 'express';
import { getAllChat, createChat, getChat, deleteChat } from '../controllers/chat';

const router = express.Router();

router.get('/chat', getAllChat);
router.post('/chat', createChat);
router.get('/chat/:id', getChat);
router.delete('/chat/:id', deleteChat)


export default router;
