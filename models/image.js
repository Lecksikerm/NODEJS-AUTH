const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "Image URL is required."],
  },
  public_id: {      // ✅ matches controller & cloudinary-helper
    type: String,
    required: [true, "public_id is required."],
  },
  title: {
    type: String,
    default: "Untitled Image",
  },
  description: {
    type: String,
    default: "",
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Uploader ID is required."],
  },
}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);


