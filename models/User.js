const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 4
  },
  profilePicture: {
    type: String,
    default: ""
  },
  coverPicture: {
    type: String,
    default: ""
  },
  followers: {
    type: Array,
    default: []
  },
  following: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    max: 140

  },
  city: {
    type: String,
    max: 50
  },
  homeTown: {
    type: String,
    max: 50
  },
  zipCode: {
    type: String,
    max: 10
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3, 4]
  },
},
  { timestamps: true }

)

module.exports = mongoose.model('User', userSchema)