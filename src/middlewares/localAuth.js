const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(new LocalStrategy(
    async(username, password, done)=> {
      try{
        console.log("Recived Credentials: ", username,password);
        const user = await User.findOne({username});
        if(!user){
          return done(null,false,{message:'Incorrect Username.'}); // error,user,info
        }
        
        const isPasswordMatched = await user.comparePassword(password);
        if(isPasswordMatched){
          return done(null,user);
        }else{
          return done(null,false,{message:'Incorrect Password'});
        }

      }catch(error){
        return done(error);
      }
    }
  ));

module.exports = passport;