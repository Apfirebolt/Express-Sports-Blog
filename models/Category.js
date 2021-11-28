const mongoose = require("mongoose");

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

categorySchema.pre('remove', function(next) {
  this.model('Post').remove({ category: this._id }, next);
});

mongoose.model("Category", categorySchema);
