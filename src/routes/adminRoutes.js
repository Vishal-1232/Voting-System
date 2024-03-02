const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");

// route for creating new candidate
router.post("/candidates", async (req, res) => {
  try {
    const userData = req.userData;
    const user = await User.findById(userData.id);
    if (user.role != "admin") {
      return res.status(401).json({ error: "You are not an Admin!!" });
    }

    let candidate = new Candidate(req.body);
    let response = await candidate.save();
    res.json({ data: response });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/candidates/:id", async (req, res) => {
  // Extract info
  const { id } = req.params;
  const { name, age, party } = req.body;

  try {
    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { name, age, party },
      { new: true }
    );
    res.send(candidate);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/candidates/:id", async (req, res) => {
    const {id} = req.params;
  try {
    const candidate = await Candidate.findByIdAndDelete(id);
    res.json(candidate);
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = router;
