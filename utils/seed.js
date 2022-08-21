const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('../models/Post.js');
const User = require('../models/User.js');


const userData =
  [{
    "username": "croeby0",
    "email": "wwhitbread0@surveymonkey.com",
    "password": "t0o5W4CD"
  }, {
    "username": "tgraeber1",
    "email": "rfargie1@chronoengine.com",
    "password": "NlYsEPn6"
  }, {
    "username": "wshillam2",
    "email": "snarracott2@unesco.org",
    "password": "R8pJtcTgtR0"
  }, {
    "username": "mshimoni3",
    "email": "atrappe3@netvibes.com",
    "password": "nK04vdW536"
  }, {
    "username": "lhowes4",
    "email": "camaya4@admin.ch",
    "password": "MXNkVWsz"
  }, {
    "username": "jbeetham5",
    "email": "dsnare5@myspace.com",
    "password": "G1fTkJdOb"
  }]

const postData = [{
  "userId": "6301c12d25a4f574b1848955",
  "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  "title": "Front-line"
}, {
  "userId": "6301c12d25a4f574b1848959",
  "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "title": "Programmable"
}, {
  "userId": "6301c12d25a4f574b1848956",
  "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
  "title": "Persevering"
}, {
  "userId": "6301c12d25a4f574b1848955",
  "description": "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  "title": "bandwidth-monitored"
}, {
  "userId": "6301c12d25a4f574b1848959",
  "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
  "title": "database"
}, {
  "userId": "6301c12d25a4f574b1848955",
  "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.",
  "title": "Re-engineered"
}, {
  "userId": "6301c12d25a4f574b1848956",
  "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  "title": "incremental"
}, {
  "userId": "6301c12d25a4f574b184895a",
  "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
  "title": "Self-enabling"
}, {
  "userId": "6301c12d25a4f574b1848956",
  "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  "title": "algorithm"
}, {
  "userId": "6301c12d25a4f574b1848956",
  "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  "title": "instruction set"
}, {
  "userId": "6301c12d25a4f574b184895a",
  "description": "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  "title": "migration"
}, {
  "userId": "6301c12d25a4f574b1848959",
  "description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "title": "Switchable"
}, {
  "userId": "6301c12d25a4f574b184895a",
  "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.",
  "title": "Vision-oriented"
}, {
  "userId": "6301c12d25a4f574b184895a",
  "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
  "title": "paradigm"
}, {
  "userId": "6301c12d25a4f574b1848955",
  "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
  "title": "focus group"
}, {
  "userId": "6301c12d25a4f574b1848955",
  "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  "title": "Open-source"
}, {
  "userId": "6301c12d25a4f574b1848956",
  "description": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "title": "software"
}, {
  "userId": "6301c12d25a4f574b1848959",
  "description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  "title": "Open-architected"
}, {
  "userId": "6301c12d25a4f574b1848956",
  "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  "title": "array"
}, {
  "userId": "6301c12d25a4f574b184895a",
  "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
  "title": "bifurcated"
}]



dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(console.log("🦡CONNECTED TO MONGO🟢"))
  .catch(err => console.log("🦡MONGO ERROR⛔", err));;



User.insertMany(userData)
  .then(res => console.log(res))
  .catch(err => console.log(err))

Post.insertMany(postData)
  .then(res => console.log(res))
  .catch(err => console.log(err))