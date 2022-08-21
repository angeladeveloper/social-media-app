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
  // If you are not the correct user or an admin, you can not update values. 
  if (req.body.userId === userReqId || req.body.isAdmin) {
    // If the request includes a password, update the password here

    try {
      const user = await User.findByIdAndDelete(userReqId);
      res.status(200).json({ message: "user has been deleted" })
    } catch (error) {
      return res.status(500).json({ error: "error updating database" })
    }
  } else {
    return res.status(403).json('You do not have permission to delete this account')
  }
})

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

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      // This is the user we are going to follow
      const currentUser = await User.findById(req.body.userId);
      // this is the user currently logged in
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

})
// unfollow user

router.put('/:id/unfollow', async (req, res) => {

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      // This is the user we are going to follow
      const currentUser = await User.findById(req.body.userId);
      // this is the user currently logged in
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

})

module.exports = router

// 630104bb89a5ea417af8bdff