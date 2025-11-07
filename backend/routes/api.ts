import express from 'express';
import {  handleApartmentQuery } from '../controllers/gpt';
import { populateDB } from '../db/populateDB';
import {listings} from '../middlewares/getListings';

const router = express.Router();

router.post('/gpt', handleApartmentQuery);

router.get('/listings', listings,  populateDB);


export default router
