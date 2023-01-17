const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  docId: { type: String, required: true },
  docUrls: { type: [String], required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Document", documentSchema);
