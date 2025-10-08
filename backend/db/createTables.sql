CREATE TABLE IF NOT EXISTS Users(
  userId int AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Chats (
  chatId int AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(255), 
  userId int,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) references Users(userId) ON DELETE CASCADE
);
    
CREATE TABLE IF NOT EXISTS Messages(
  messageId int AUTO_INCREMENT PRIMARY KEY,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  chatId int,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chatId) references Chats(chatId) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS Listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rentcast_id VARCHAR(255) UNIQUE,
    formattedAddress VARCHAR(255),
    addressLine1 VARCHAR(255),
    addressLine2 VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    stateFips VARCHAR(10),
    zipCode VARCHAR(20),
    county VARCHAR(100),
    countyFips VARCHAR(10),
    latitude DECIMAL(10,6),
    longitude DECIMAL(10,6),
    propertyType VARCHAR(50),
    bedrooms INT,
    bathrooms DECIMAL(3,1),
    squareFootage INT,
    status VARCHAR(50),
    price DECIMAL(10,2) ,
    listingType VARCHAR(50),
    listedDate DATETIME,
    removedDate DATETIME,
    createdDate DATETIME,
    lastSeenDate DATETIME,
    daysOnMarket INT,
     INDEX idx_bedrooms (bedrooms),
    INDEX idx_bathrooms (bathrooms),
    INDEX idx_squareFootage (squareFootage),
    INDEX idx_price (price),
    INDEX idx_daysOnMarket (daysOnMarket)
);

