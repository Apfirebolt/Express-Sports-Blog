const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pictures: [{
      name: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: false
      },
    }],
  },
  {
    timestamps: true,
  }
);

mongoose.model("Post", postSchema);
