const router = require('express').Router();
const User = require('../../models/User.js');
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.send('Welcome to user page')
})


//update user
router.put('/:id', async (req, res) => {

  const userReqId = req.params.id
  // If you are not the correct user or an admin, you can not update values. 
  if (req.body.userId === userReqId || req.body.isAdmin) {
    // If the request includes a password, update the password here
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "error updating database" })
      }
    }
    // after checking if password needs updated, update the rest of the req.body. 
    try {
      const user = await User.findByIdAndUpdate(userReqId, { $set: req.body });
      res.status(200).json({ message: "user has been updated" })
    } catch (error) {
      return res.status(500).json({ error: "error updating database" })
    }
  } else {
    return res.status(403).json('You do not have permission to update this account')
  }
})

// delete user
router.delete('/:id', async (req, res) => {

  const userReqId = req.params.id
  // If you are not the correct user or an admin, you can not delete users. 
  if (req.body.userId === userReqId || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(userReqId);
      res.status(200).json("User has been deleted⛔")
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json('You do not have permission to delete this account')
  }
});

// get user
router.get('/:id', async (req, res) => {
  const userReqId = req.params.id
  try {
    const user = await User.findById(userReqId, { password: 0, updatedAt: 0, isAdmin: 0 });
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: "error, Cannot be found" })
  }

})

// follow user
router.put('/:id/follow', async (req, res) => {
  // You cant follow yourself
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      // This is the user we are going to follow - set in the params
      const currentUser = await User.findById(req.body.userId);
      // this is the user currently logged in - set in the body
      // if theyre not already following, update the follower and followee
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User followed👍 successfully! ✅")
      } else {
        res.status(403).json("You are all ready following this user ")
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You cannot follow yourself...🤦‍♀️")
  }

});


// unfollow user
router.put('/:id/unfollow', async (req, res) => {

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      // This is the user we are going to follow
      const currentUser = await User.findById(req.body.userId);
      // this is the user currently logged in
      // do the opposite of the follow route. take ids from each others arrays. 
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User unfollowed👎 successfully! ✅")
      } else {
        res.status(403).json("You dont follow this User")
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You cannot unfollow yourself...🤦‍♀️")
  }
});

module.exports = router
