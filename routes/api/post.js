const router = require('express').Router();
const User = require('../../models/User.js');
const Post = require('../../models/Post.js');

router.get('/', async (req, res) => {
  res.send('Welcome to post page')
})

// create post

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
    console.log("Post saved")
  } catch (error) {
    res.status(500).json(error)
  }
})

// update post

router.put('/:id', async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      res.status(403).json('You do not have permission to edit this post')
    } else {
      await post.updateOne({ $set: req.body })
      res.status(200).json('Post Updated 📝')
    }
  } catch (error) {
    res.status(500).json(err)
  }
})
//  delete post

router.delete('/:id', async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);
    if (post.userId !== req.body.userId) {
      res.status(403).json('You do not have permission to edit this post')
    } else {
      await post.deleteOne({ _id: req.params.id })
      res.status(200).json('Post Deleted ⛔ ')
    }
  } catch (error) {
    res.status(500).json(err)
  }
})
// like a post

router.put('/:id/like', async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(403).json("Post has been DISliked!👎⛔")
    } else {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json("Post has been liked!👍✅")
    }

  } catch (error) {
    res.status(500).json(error)
  }
})
// get a post


router.get('/:id', async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(403).json("No post found")
    } else {
      res.status(200).json(post)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})
// get all posts

router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
