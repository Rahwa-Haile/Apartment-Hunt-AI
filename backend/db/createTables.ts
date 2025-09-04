import { connectDB } from './connectDB';

const createTables = async () => {
  try {
    await connectDB.query(
      `CREATE TABLE IF NOT EXISTS Users(
        userId int AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    );
    await connectDB.query(
      `CREATE TABLE IF NOT EXISTS Chats (
      chatId int AUTO_INCREMENT PRIMARY KEY, 
      title VARCHAR(255), 
      userId int,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) references Users(userId)
      )`
    );

    await connectDB.query(
      `CREATE TABLE IF NOT EXISTS Messages(
            messageId int AUTO_INCREMENT PRIMARY KEY,
            role VARCHAR(255),
            content TEXT,
            chatId int,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (chatId) references Chats(chatId)
        )`
    );
    console.log('table is created');
  } catch (error: any) {
    console.log(error.message);
  }
};

createTables();
