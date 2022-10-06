const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); // to validate that the email is unique

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["guest", "member", "admin"],
    default: "guest",
  },
  actIds: [{ type: Array, default: [] }],
  adhId: { type: Number, default: null },
});

userSchema.plugin(uniqueValidator); // add the plugin to the schema

module.exports = mongoose.model("User", userSchema);
