-- N/B - postgres is case insensitive thus avoid camelcase/pascalcase

CREATE DATABASE vinyl_catalogue;
--  to use database type: \c vinyl_catalogue;

-- main table for entering track
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
    PRIMARY KEY(track_id)
);

-- creating favs
CREATE TABLE favourites (
    favourite_id SERIAL,
    track_id INT UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(favourite_id),
    FOREIGN KEY (track_id) REFERENCES music(track_id) ON DELETE CASCADE,
);

-- for making playlists (replace table_name with user defined one)
CREATE TABLE table_name (
    track_number SERIAL,
    track_id INT UNIQUE,
    playlist BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (track_number),
    FOREIGN KEY (track_id) REFERENCES music (track_id) ON DELETE CASCADE
)