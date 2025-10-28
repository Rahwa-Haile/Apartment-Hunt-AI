declare global {
  type ListingFilters = {
    city: string | null;
    state: string | null;
    price_min: number | null;
    price_max: number | null;
    bedrooms_min: number | null;
    bedrooms_max: number | null;
    bathrooms_min: number | null;
    bathrooms_max: number | null;
  };
}

export function buildListingsQuery(f: ListingFilters) {
  const where: string[] = [];
  const params: any[] = [];

  // City / State filters
  if (f.city) {
    where.push(`city = ?`);
    params.push(f.city.trim());
  }
  if (f.state) {
    where.push(`state = ?`);
    params.push(f.state.trim());
  }

  // Price filters
  if (typeof f.price_min === 'number') {
    where.push(`price >= ?`);
    params.push(f.price_min);
  }
  if (typeof f.price_max === 'number') {
    where.push(`price <= ?`);
    params.push(f.price_max);
  }

  // Bedrooms
  if (typeof f.bedrooms_min === 'number') {
    where.push(`bedrooms >= ?`);
    params.push(f.bedrooms_min);
  }
  if (typeof f.bedrooms_max === 'number') {
    where.push(`bedrooms <= ?`);
    params.push(f.bedrooms_max);
  }

  // Bathrooms
  if (typeof f.bathrooms_min === 'number') {
    where.push(`bathrooms >= ?`);
    params.push(f.bathrooms_min);
  }
  if (typeof f.bathrooms_max === 'number') {
    where.push(`bathrooms <= ?`);
    params.push(f.bathrooms_max);
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const sql = `
    SELECT
        *
    FROM Listings
    ${whereSql}
    ORDER BY price ASC, listedDate DESC
    LIMIT 15;
  `;

  return { sql, params };
}
