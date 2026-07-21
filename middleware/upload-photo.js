const uploadPhoto = (req, res, next) => {
    const upload = multer({dest: './uploads/'})
    const uploadFile = upload.single('photo')

     uploadFile(req, res, function(err)){

        req.photoName = photoName,
        req.uploadError = err
    }
  next();
};

module.exports = uploadPhoto;
