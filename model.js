const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("UserSchema", UserSchema);
