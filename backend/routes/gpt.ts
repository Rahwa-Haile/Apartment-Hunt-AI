import express from 'express';
import { createGPTResponse } from '../controllers/gpt';

const router = express.Router();

router.post('/', createGPTResponse);

export default router
