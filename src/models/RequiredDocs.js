const mongoose = require("mongoose");

const requiredDocsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
  docUrl: { type: String, required: true },
});

module.exports = mongoose.model("RequiredDocs", requiredDocsSchema);
