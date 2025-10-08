import { Request, Response } from 'express';
import { connectDB } from '../db/connectDB';

export const populateDB = async (req: Request, res: Response) => {
  try {
    const listings = req.listings;
    console.log(listings);
    const rows = listings.map((l: any) => [
      l.id ?? null, // rentcast_id
      l.formattedAddress ?? null,
      l.addressLine1 ?? null,
      l.addressLine2 ?? null,
      l.city ?? null,
      l.state ?? null,
      l.stateFips ?? null,
      l.zipCode ?? null,
      l.county ?? null,
      l.countyFips ?? null,
      l.latitude ?? null,
      l.longitude ?? null,
      l.propertyType ?? null,
      l.bedrooms ?? null,
      l.bathrooms ?? null,
      l.squareFootage ?? null,
      l.status ?? null,
      l.price ?? null,
      l.listingType ?? null,
      l.listedDate ? new Date(l.listedDate) : null,
      l.removedDate ? new Date(l.removedDate) : null,
      l.createdDate ? new Date(l.createdDate) : null,
      l.lastSeenDate ? new Date(l.lastSeenDate) : null,
      l.daysOnMarket ?? null,
    ]);

    await connectDB.query(
      `INSERT INTO Listings (
      rentcast_id,formattedAddress, 
      addressLine1, 
      addressLine2, 
      city, 
      state, 
      stateFips, 
      zipCode, 
      county, 
      countyFips, 
      latitude, 
      longitude, 
      propertyType, 
      bedrooms, 
      bathrooms, 
      squareFootage, 
      status, 
      price, 
      listingType, 
      listedDate, 
      removedDate, 
      createdDate, 
      lastSeenDate, 
      daysOnMarket) VALUES ? ON DUPLICATE KEY UPDATE formattedAddress = VALUES(formattedAddress), addressLine1 = VALUES(addressLine1),
      addressLine2 = VALUES(addressLine2),
      city = VALUES(city),
      state = VALUES(state),
      stateFips = VALUES(stateFips),
      zipCode = VALUES(zipCode),
      county = VALUES(county),
      countyFips = VALUES(countyFips),
      latitude = VALUES(latitude),
      longitude = VALUES(longitude),
      propertyType = VALUES(propertyType),
      bedrooms = VALUES(bedrooms),
      bathrooms = VALUES(bathrooms),
      squareFootage = VALUES(squareFootage),
      status = VALUES(status),
      price = VALUES(price),
      listingType = VALUES(listingType),
      listedDate = VALUES(listedDate),
      removedDate = VALUES(removedDate),
      createdDate = VALUES(createdDate),
      lastSeenDate = VALUES(lastSeenDate),
      daysOnMarket = VALUES(daysOnMarket)`,
      [rows]
    );
    res.status(201).json({ msg: 'Listings saved successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
