const express = require('express');
const router = express.Router();
const User = require("../models/user");

router.post("/user", async (req, res) => {
    try {
      const user = User(req.body);
      const response = await user.save();
      res.json(response);
    } catch (e) {
      res.status(500).json({
        error: e.message,
      });
    }
  });

router.get("/user",async(req,res)=>{
  try{
    const data = await User.find();
    console.log("Data Fetch");
    res.status(200).json(data);
  }catch(e){
    res.status(500).json({
      error: e.message,
    });
  }
});  

router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName} = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}); 

router.delete('/user/:id', async (req, res) => {
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