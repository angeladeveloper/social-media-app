const router = require('express').Router();
const User = require('../../models/User.js');
const Post = require('../../models/Post.js');


// create post - This needs to have a userId manually added in!!
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost)
    console.log("Post saved")
  } catch (error) {
    res.status(500).json(error)
  }
});

// update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Make sure the user OWNS the post, otherwise don't let them proceed. 
    if (post.userId !== req.body.userId) {
      res.status(403).json('You do not have permission to edit this post')
    } else {
      await post.updateOne({ $set: req.body })
      res.status(200).json('Post Updated 📝')
    }
  } catch (error) {
    res.status(500).json(err)
  }
});

//  delete post
router.delete('/:id', async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    // Check to make sure that the user OWNS the post, otherwise, dont let them proceed. 
    if (post.userId !== req.body.userId) {
      res.status(403).json('You do not have permission to edit this post')
    } else {
      await post.deleteOne({ _id: req.params.id })
      res.status(200).json('Post Deleted ⛔ ')
    }
  } catch (error) {
    res.status(500).json(err)
  }
});

// like a post
router.put('/:id/like', async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    // Here, TOGGLE between like and dislike
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
});

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
});

// get all posts from the users followed and users own post
router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    // Get ALL friends posts, which can take awhile, so do promise on each map itteration
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    );
    // concat the two arrays together to make one large timeline
    res.json(userPosts.concat(...friendPosts))
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
