const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    mobile:{
        type:String,
        //unique:true,
        required:true,
    },
    email:{
        type:String,
        //unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate: {
            validator: (value) => {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      
              return value.match(re);
            },
            message: "Plese enter valid email address",
          },
    },
    
    userType:{
      type:String,
      enum:['admin','user','organization','superUser'],
      required:true,
      trim:true,
      lowercase:true
    }
},{ timestamps: true });

const user = mongoose.model('users',userSchema);
module.exports = user;