const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const items = require("./routes/api/items");

const app = express();

// CORS Middleware

app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect mongo DB
mongoose
  .connect(db)
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.log(err));

// passport middelware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/items", items);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server listening on port : ${PORT}`));
