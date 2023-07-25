const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const crypto = require('crypto');

// Fonction de chiffrement
function encrypt(text, secret) {
  const cipher = crypto.createCipher('aes-256-cbc', secret);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Fonction de déchiffrement
function decrypt(encrypted, secret) {
  const decipher = crypto.createDecipher('aes-256-cbc', secret);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
const boydParser = require('body-parser');
app.use(boydParser.json())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-credentials', 'true');
  next();
});

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

var session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);

const db = require("./app/models");
const Role = db.role;

var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions))

// db.sequelize.sync();
// db.sequelize.sync().then(() => {
//   console.log('Drop and Resync Db');
//    initial();
// });

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
