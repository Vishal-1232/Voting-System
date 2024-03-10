const express = require("express");
const Candidate = require("../models/candidate");
const User = require("../models/user");
const router = express.Router();

// route to provide candidates list for voting
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// route to provide functionality for voting
router.post("/:id", async (req, res) => {
  try {
    // check if user already voted
    const user = await User.findById(req.userData.id);
    if (user.isVoted) {
      return res.status(400).json({ msg: "You have given your vote already!!" });
    }
    // Admins are not allowed to give votes
    if(user.role=="admin"){
        return res.status(403).json({ msg: "Admins are not allowed to give votes!!" });
    }

    const { id } = req.params;
    let candidate = await Candidate.findById(id);
    // const userData = req.userData;
    //const user = await User.findById(userData.id);
    //console.log(userData);
    candidate.voteCount++;
    candidate.votes.push({ user: req.userData.id });
    candidate = await candidate.save();
    user.isVoted = true;
    await user.save();
    res.json(candidate);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// route to show vote counts in descending order 
router.get("/count",async(req,res)=>{
    try{
        // find all the candidates and sort them in descending order
        const candidates = await Candidate.find().sort({voteCount:"desc"});

        // Map the candidates to only return their name and vote count
        const voteRecord = candidates.map((data)=>{
            return {
                party:data.party,
                count:data.voteCount
            };
        });

        res.json(voteRecord);

    }catch(e){
        res.status(500).json({error:e.message});
    }
});


module.exports = router;
