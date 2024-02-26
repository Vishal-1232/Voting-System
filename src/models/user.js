const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
      type:Number,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    aadharCardNumber:{
      type:Number,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    mobile:{
        type:String,
        //unique:true,
        //required:true,
    },
    email:{
        type:String,
        //unique:true,
        //required:true,
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
    role:{
      type:String,
      enum:["voter","admin"],
      default:"voter",
      trim:true,
      lowercase:true
    },
    isVoted:{
      type:Boolean,
      default:false
    }
},{ timestamps: true });

const User = mongoose.model('User',userSchema);
module.exports = User;