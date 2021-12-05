const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

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
    video: {
      type: String,
      required: false,
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

postSchema.pre('findOneAndDelete', async function () {
  const docToDelete = await this.model.findOne(this.getQuery());
  // Check if there are pictures associated with this post, if yes delete them all
  if (docToDelete.pictures.length) {
    docToDelete.pictures.forEach((currentPicture) => {
      const filePath = path.join(__dirname, `../uploads/${currentPicture.name}`);
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
    })
  }
  // Check if there is a video associated with this post, if yes, then delete it
  if (docToDelete.video) {
    const filePath = path.join(__dirname, `../uploads/${docToDelete.video}`);
    fs.unlink(filePath, (err) => {
      if (err) console.log(err);
    });
  }
});

mongoose.model("Post", postSchema);
