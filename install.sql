CREATE DATABASE wildcircus;

USE wildcircus;

-- users TABLE CREATION
CREATE TABLE clients (
  id_client INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname_client VARCHAR(255),
  lastname_client VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE artists(
  id_artist INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstname_artist VARCHAR(255),
  lastname_artist VARCHAR(255),
  speciality_artist VARCHAR(255),
  description_artist VARCHAR(500),
  picture_artist VARCHAR(255)
);

CREATE TABLE events (
  id_event INT NOT NULL AUTO_INCREMENT,
  date_event DATETIME,
  name_event VARCHAR(255),
  capacity INT,
  address_event VARCHAR(255),
  description_event VARCHAR(255),
  PRIMARY KEY (id_event)
);

CREATE TABLE event_artists (
  id_event_artists INT NOT NULL AUTO_INCREMENT,
  artist_id INT,
  event_id INT,
  PRIMARY KEY (id_event_artists),
  FOREIGN KEY (artist_id) REFERENCES artists(id_artist),
  FOREIGN KEY (event_id) REFERENCES events(id_event)
);

CREATE TABLE registrations (
  id_registration INT NOT NULL AUTO_INCREMENT,
  quantity INT,
  client_id INT,
  event_id INT,
  PRIMARY KEY (id_registration),
  FOREIGN KEY (client_id) REFERENCES clients(id_client),
  FOREIGN KEY (event_id) REFERENCES events(id_event)
);

CREATE TABLE admins (
  id_admin INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255)
);
INSERT INTO admins (email, password, name) VALUES ('admin@gmail.com', '$2a$10$frAzPBXeg.av/yvgBfRvyeMuS1MTwHvb2kF3oii.vtxA7A.ZKdQTu', 'admin');