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


// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomAssignments, userData };
