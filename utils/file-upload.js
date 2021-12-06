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

profilePictureStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`);
  },
});

videoStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `video-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only jpeg, jpg and png images are allowed'));
  }
}

function checkVideoFileType(file, cb) {
  const filetypes = /mp4|avi|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only mp4 video format is allowed'));
  }
}

exports.upload = multer({
  storage: imageStorage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

exports.videoUpload = multer({
  storage: videoStorage,
  limits: {
    fieldNameSize: 300,
    fileSize: 10485760, // 10 Mb
  },
  fileFilter: function(req, file, cb) {
    checkVideoFileType(file, cb);
  }
})

exports.profilePictureUpload = multer({
  storage: profilePictureStorage,
  limits: {
    fieldNameSize: 300,
    fileSize: 2097152, // 2 Mb
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
})