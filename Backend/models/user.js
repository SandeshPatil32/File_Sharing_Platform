/* const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, unique: true},
  password: {type: String, required: true},
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
module.exports = mongoose.model("User", userData); */


const mongoose = require("mongoose");

const userData = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // FREE PLAN LIMIT
  uploadsUsed: {
    type: Number,
    default: 0,
  },

  // PREMIUM USER
  isPremium: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model("User", userData);