const router = require('express').Router();
const User = require('../../models/User.js');
const bcrypt = require('bcrypt')


// Register a new User
router.post("/register", async (req, res) => {
  try {
    //generate new password and bcrypt/salt it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user with the hashed password, everything else comes from the req.body. 
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //  save new user and send data back to page
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});


// Login User

router.post('/login', async (req, res) => {
  // Check to make sure user entered and Email and password
  if (!req.body.email || !req.body.password) {
    console.log("You have to enter something!")
    res.status(401).json('Values Missing')
  }
  try {
    // Find User by email
    const user = await User.findOne({ email: req.body.email });
    // User bcrypt to compare passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    // if no user, 404
    if (!user) {
      res.status(404).json('WRONG')
      // if password wrong, 404
    } else if (!validPassword) {
      res.status(404).json('WRONG')
    } else {
      user && res.status(200).json('User Logged in✅')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router

