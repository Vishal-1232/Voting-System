const express = require("express");
const DB = require("./db/db");
const app = express();
const port = 3000;

app.use(express.json());
const userRoter = require('./routes/userRoutes');
app.use('/',userRoter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});


