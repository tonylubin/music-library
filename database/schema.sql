CREATE DATABASE vinyl_catalogue;
USE vinyl_catalogue;

CREATE TABLE music (
    trackId INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    -- time format "hh:mm:ss"
    duration TIME,  
    genre VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255),
    year INT NOT NULL,
    audioFilename VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
    PRIMARY KEY(trackId)
);

CREATE TABLE favourites (
    favouriteId INT AUTO_INCREMENT,
    trackId INT,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(favouriteId),
    FOREIGN KEY (trackId) REFERENCES music(trackId),
);