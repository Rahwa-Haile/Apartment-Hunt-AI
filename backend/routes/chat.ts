import express from 'express';
import { getAllChat, createChat, getChat, deleteChat } from '../controllers/chat';

const router = express.Router();

router.get('/', getAllChat);
router.post('/', createChat);
router.get(':id', getChat);
router.delete(':id', deleteChat)


export default router;
