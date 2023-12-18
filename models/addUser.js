const mongoose = require("mongoose");

const addUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
  },
  {timestamps: true}
);

module.exports = mongoose.model("AddUser", addUserSchema);