const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    username:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    }
},{ timestamps: true });

userSchema.pre('save',async function(next){
  const user = this;
   
  // Hashed the password only if its new or modified
  if(!user.isModified('password')){
    return next();
  }
  
  try{
    // hash password geneartion
    const salt = await bcrypt.genSalt(10);

    // hashing
    const hashedPassword = await bcrypt.hash(user.password,salt);

    // Override plain password with hashed password
    user.password = hashedPassword;
    next();

  }catch(e){
    return next(e);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword){
  try{
    const isMatch = await bcrypt.compare(enteredPassword,this.password);
    return isMatch;
  }catch(e){
    throw e;
  }
}


const User = mongoose.model('User',userSchema);
module.exports = User;