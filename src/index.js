const express = require("express");
const DB = require("./db/db");
const app = express();
require('dotenv').config();
const userRoter = require('./routes/userRoutes');
const logger = require("./middlewares/logger");

app.use(express.json());
app.use(logger);
app.use('/',userRoter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});


