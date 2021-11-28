const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { users } = require('../data/user.js');
require("../models/Category");
require("../models/User");
require("../models/Post");
const { connectDB } = require('../config/db.js');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    const Category = mongoose.model("Category");
    const Post = mongoose.model("Post"); 
    const User = mongoose.model("User"); 

    await Post.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    if (createdUsers) {
        console.log('User data successfully imported');
    }

    process.exit()
  } catch (error) {
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    const Category = mongoose.model("Category");
    const Post = mongoose.model("Post"); 
    const User = mongoose.model("User"); 

    await Post.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed');
    process.exit()
  } catch (error) {
    console.log(error);  
    process.exit(1)
  }
}

destroyData();
