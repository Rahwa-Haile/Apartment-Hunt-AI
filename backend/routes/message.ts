import express from 'express';
import { getAllMessage, createMessage, getMessage } from '../controllers/message';

const router = express.Router();

router.get('/message/:chatId', getAllMessage);
router.post('/message/:chatId', createMessage);
router.get('/message/:chatId/:id', getMessage);



export default router;
