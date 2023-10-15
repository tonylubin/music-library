-- N/B - postgres is case insensitive thus avoid camelcase/pascalcase

CREATE DATABASE vinyl_catalogue;
USE vinyl_catalogue;

CREATE TABLE music (
    track_id SERIAL,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255),
    -- time format "hh:mm:ss"
    duration TIME,  
    genre VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    audio_url VARCHAR(255),
    year INT NOT NULL,
    audioFilename VARCHAR(255) NOT NULL,
    PRIMARY KEY(trackId)
);

CREATE TABLE favourites (
    favouriteId SERIAL,
    trackId INT UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(favouriteId),
    FOREIGN KEY (trackId) REFERENCES music(trackId) ON DELETE CASCADE,
);