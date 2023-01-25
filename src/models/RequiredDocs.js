const mongoose = require("mongoose");

const requiredDocsSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("RequiredDocs", requiredDocsSchema);
