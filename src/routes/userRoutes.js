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

router.put("/user/:id",async (req,res)=>{
  try{

  }catch (e){
    res.status(500).json({
      error:e.message
    });
  }
});  

  module.exports = router;