const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('User', UserSchema);

export default User;