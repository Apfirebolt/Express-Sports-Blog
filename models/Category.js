const { query } = require("express-validator");
const mongoose = require("mongoose");

require("../models/Post");
const Post = mongoose.model("Post");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre('deleteOne', async function() {
  const docToDelete = await this.model.findOne(this.getQuery());
  await Post.deleteMany({ category: docToDelete._id });
});

mongoose.model("Category", categorySchema);
