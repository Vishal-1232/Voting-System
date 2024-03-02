const express = require("express");
const DB = require("./db/db");
const app = express();
require('dotenv').config();
const userRoter = require('./routes/userRoutes');
const adminRouter = require("./routes/adminRoutes");
const logger = require("./middlewares/logger");
const passport = require("./middlewares/localAuth");
const { jwtAuthMiddleware } = require("./middlewares/jwtAuth.middleware");

app.use(express.json());
app.use(logger);
// app.use(passport.initialize());
// app.use('/user',passport.authenticate('local',{session:false}),userRoter);
app.use('/user',userRoter);
app.use('/admin',jwtAuthMiddleware,adminRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});