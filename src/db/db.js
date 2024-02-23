const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
})

module.exports = mongoose.connection;