const mysql = require('mysql');
const myPassword = require('./.password');

const connection = mysql.createConnection({
  host: 'localhost', // adresse du serveur
  user: 'root', // le nom d'utilisateur
  password: myPassword, // le mot de passe
  database: 'wildcircus', // le nom de la base de données
});

module.exports = connection;
