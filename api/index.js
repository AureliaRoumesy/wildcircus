const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./conf');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const api = express();

const privateKEY = fs.readFileSync('./.private.key', 'utf8');
const publicKEY = fs.readFileSync('./.public.key', 'utf8');

const signOptions = {
  expiresIn: "12h",
  algorithm: "RS256"
};

const verifyOptions = {
  expiresIn: "12h",
  algorithm: ["RS256"]
};

// Support JSON-encoded bodies
api.use(bodyParser.json());
// Support URL-encoded bodies
api.use(bodyParser.urlencoded({
  extended: true,
}));
// allows cross origin requests (localhost:xxxx)
// api.use(cors());
api.use(cors({ origin: '*' }));

connection.connect((err) => {
  if (err) throw err;
  console.log('connected to MYSQL database');
});

api.post('/api/login/', (req, res) => {
  const values = req.body;
  console.log('login')
  connection.query(`SELECT * FROM admins WHERE email='${values.emailSignIn}'`,
    (err, result) => {
      if (result.length === 0) {
        console.log(err)
        res.status(500).send("Erreur dans l'email ou le mot de passe.");
      } else {
        if (result.length > 0) {
          bcrypt.compare(values.passwordSignIn, result[0].password, (err, result) => {
            if (result === true) {
              console.log('signIn OK')
              const payload = { email: values.emailSignIn };
              const token = jwt.sign(payload, privateKEY, signOptions);
              res.send(token);
            } else {
              console.log('mauvais mot de passe')
              res.status(500).send("Erreur dans l'email ou le mot de passe.");
            }
          });
        }
      }
    });
});

api.post('/api/auth/', verifyToken, (req, res) => {
  jwt.verify(req.token, publicKEY, verifyOptions, (err, authData) => {
    if (err) {
      console.log(err)
      res.sendStatus(403);
    } else {
      res.sendStatus(200)
    }
  });
});

api.get('/api/artists', (req, res) => {
  connection.query('SELECT * FROM artists', (err, result) => {
    const data = result.map((artist, index) => ({
      id: artist.id_artist,
      firstname: artist.firstname_artist,
      lastname: artist.lastname_artist,
      picture: artist.picture_artist,
      bio: artist.description_artist,
      speciality: artist.speciality_artist,
    }))
    if (err) throw err;
    res.json(data);
  });
});


api.post('/api/event/', verifyToken, (req, res) => {
  jwt.verify(req.token, publicKEY, verifyOptions, (err, authData) => {
    if (err) {
      console.log(err)
      res.sendStatus(403);
    } else {
      const values = req.body;
      console.log(values)
      { values.capacityEvent ? values.capacityEvent = parseInt(values.capacityEvent, 10) : values.capacity = null }
      { values.dateEvent ? values.dateEvent = `"${moment(values.dateEvent).format("YYYY-MM-DD HH:mm:ss")}"` : values.dateEvent = null }
    
      connection.query(`INSERT INTO events (date_event, name_event, capacity, address_event, description_event) VALUES (${values.dateEvent}, "${values.nameEvent}", ${values.capacityEvent}, "${values.addressEvent}", "${values.descriptionEvent}")`,
        (err, results) => {
          if (err) {
            console.log(err)
            res.status(500).send("Erreur lors de l'enregistrement d'un show.");
          } else {
            connection.query('SELECT id_event FROM events ORDER BY id_event DESC LIMIT 1', (err, result) => {
              if (err) {
                console.log(err)
                res.status(500).send("Erreur lors de l'enregistrement d'un show.");
              } else {
                for (let i = 0; i < values.artistsSelected.length; i ++){
                  connection.query(`INSERT INTO event_artists (artist_id, event_id) VALUES (${parseInt(values.artistsSelected[i].id, 10)}, ${parseInt(result[0].id_event, 10)})`,
                   (err, result) => {
                    if (err) throw err;
                    res.send(result);
                  })
                }
              }
            }) 
          }
        })
    }
  });
});

api.post('/api/artist/', verifyToken, (req, res) => {
  jwt.verify(req.token, publicKEY, verifyOptions, (err, authData) => {
    if (err) {
      console.log(err)
      res.sendStatus(403);
    } else {
      const values = req.body;
      console.log(values)

      connection.query(`INSERT INTO artists (firstname_artist, lastname_artist, picture_artist, description_artist, speciality_artist) VALUES ('${values.firstnameArtist}', '${values.lastnameArtist}', '${values.pictureArtist}', '${values.bioArtist}', '${values.specialityArtist}')`,
        (err, results) => {
          if (err) {
            console.log(err)
            res.status(500).send("Erreur lors de l'enregistrement d'un artiste.");
          } else {
            connection.query('SELECT id_artist FROM artists ORDER BY id_artist DESC LIMIT 1', (err, result) => {
              if (err) throw err;
              res.send(result);
            })
          }
        })
    }
  });
});

api.listen(8000, 'localhost', (err) => {
  if (err) throw err;
  console.log('API is running on localhost:8000');
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    console.log("ERROR VERIFY TOKEN")
    res.sendStatus(403);
  }
};
