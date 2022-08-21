const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  description: {
    type: String,
    max: 500,
  },
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  likes: {
    type: Array,
    default: []
  }

},
  { timestamps: true }

)

module.exports = mongoose.model('Post', postSchema)