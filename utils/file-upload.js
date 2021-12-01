const multer = require('multer');
const path = require('path');

// Multer upload functions
imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
  },
});

videoStorage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('calling disk storage ',)
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `video-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|mp4|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

function checkVideoFileType(file, cb) {
  console.log('Inside video check ', file);
  const filetypes = /mp4|avi|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    console.log('Valid extension');
    return cb(null, true);
  } else {
    console.log('Invalid..');
    cb("Video only!");
  }
}

exports.upload = multer({
  imageStorage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

exports.videoUpload = multer({
  videoStorage,
  fileFilter: function(req, file, cb) {
    checkVideoFileType(file, cb);
  }
})