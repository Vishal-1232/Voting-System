const express = require("express");
const DB = require("./db/db");
const app = express();
require('dotenv').config();

app.use(express.json());
const userRoter = require('./routes/userRoutes');
app.use('/',userRoter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});


