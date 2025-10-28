import express from 'express';
import { getFilteredListings } from '../controllers/listings';

const router = express.Router();

router.post('/apartments', getFilteredListings);


export default router;
