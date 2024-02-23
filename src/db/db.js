const mongoose = require('mongoose');
const DB = "mongodb+srv://kaushikvishal479:habsZCn72mFhXleE@cluster0.vhcx4lq.mongodb.net/";

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
})

module.exports = DB;