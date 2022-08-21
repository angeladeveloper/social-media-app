const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


main()
  .then(d => console.log("🦡Connected to MongoDB!!"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("🦡Connected to MongoDB")
}

app.listen(3001, () => {
  console.log("🚀 Server is running")
})