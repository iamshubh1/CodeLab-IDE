let mongoose = require('mongoose');

let MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date:{
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('client', userSchema); // 'User' is the name of the collection