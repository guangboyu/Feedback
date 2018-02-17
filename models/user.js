//lib
const mongoose = require('mongoose');
const {Schema} = mongoose;
//component
//logic
const userSchema = new Schema({
  googleId: String
})

mongoose.model('users', userSchema);
