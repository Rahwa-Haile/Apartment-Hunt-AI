import express from 'express';
import { getAllMessage, createMessage, getMessage } from '../controllers/message';

const router = express.Router();

router.get('/', getAllMessage);
router.post('/', createMessage);
router.get(':id', getMessage);



export default router;
