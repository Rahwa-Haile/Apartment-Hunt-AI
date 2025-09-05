import fs from 'fs';
import { connectDB } from './connectDB';

const runMigrations = async () => {
  try {
    const sqlScript = fs.readFileSync('db/createTables.sql', 'utf-8');
    await connectDB.query(sqlScript);
    console.log('tables are created');
    process.exit(0);
  } catch (error) {
    console.log('migration failed ' + error);
    process.exit(1);
  }
};

runMigrations();
