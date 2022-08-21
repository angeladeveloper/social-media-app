const router = require('express').Router();
const User = require('../../models/User.js');
const bcrypt = require('bcrypt')


// Register
router.post("/register", async (req, res) => {
  try {
    //generate new password and bcrypt/salt it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});


// Login

router.post('/login', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    console.log("you have to enter something!")
    res.status(401).json({ message: 'What are you doing?' })
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      res.status(404).json('WRONG')
    } else if (!validPassword) {
      res.status(404).json('WRONG')
    } else {
      user && res.status(200).json('User found')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router

