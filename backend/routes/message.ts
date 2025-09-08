import express from 'express';
import { getAllMessage, createMessage, getMessage } from '../controllers/message';

const router = express.Router();

router.get('/:chatId', getAllMessage);
router.post('/:chatId', createMessage);
router.get('/:chatId/:id', getMessage);



export default router;
