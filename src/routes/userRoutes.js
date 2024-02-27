const express = require("express");
const router = express.Router();
const User = require("../models/user");
require("dotenv").config();
const {
  jwtAuthMiddleware,
  generateToken,
} = require("../middlewares/jwtAuth.middleware");

router.post("/signup", async (req, res) => {
  try {
    const user = User(req.body);
    const response = await user.save();

    const payload = {
      id: response.id,
      username: response.username,
    };

    const token = generateToken(payload);

    res.json({ response: response, token: token });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Extract username and password from body
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username: username });
    // if user doessnot exist or password not matched
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate token
    const payload = {
      id: user.id,
      username: username,
    };

    const token = generateToken(payload);

    res.json({token:token});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/profile",jwtAuthMiddleware,async (req,res)=>{
  try{
    const userData = req.userData;
    const user = await User.findById(userData.id);
    res.json({user});
  }catch(e){
    res.status(500).json({error:e.message});
  }
});

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await User.find();
    console.log("Data Fetch");
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
