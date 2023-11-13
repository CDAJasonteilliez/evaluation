const multer = require('multer');
const path = require('path');

const uploadAvatar = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
  
        cb(null, path.join(__dirname,'..',"/upload/avatars"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      }
    }),
    limits : {
      fileSize: 80000
    },
    fileFilter : (req, file, cb) => {
      cb(null,true);
    }
});

const uploadSerie = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {

      cb(null, path.join(__dirname,'..',"/upload/series"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  }),
  limits : {
    fileSize: 10000000
  },
  fileFilter : (req, file, cb) => {
    cb(null,true);
  }
});

module.exports =  { uploadAvatar, uploadSerie };