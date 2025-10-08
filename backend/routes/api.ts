import express from 'express';
import { createGPTResponse } from '../controllers/gpt';
import { populateDB } from '../db/populateDB';
import {listings} from '../middlewares/getListings';

const router = express.Router();

router.post('/gpt', createGPTResponse);
router.get('/listings', listings,  populateDB);


export default router
