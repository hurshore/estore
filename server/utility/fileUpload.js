const multer = require('multer');
const { v1: uuidv4 } = require('uuid');

//we specify mime type to let multer know the expected file formats
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const fileUpload = multer({
	// specify the highest possible size of 500kb(not compulsory)
  limits: 500000,
	//specify storage destination
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, 'uploads/images'); 
		//you will create a folder called uploads then images
    },
	  //now to name the images received
    filename: (req, file, cb) => {
  //ext here is the file extension and uuid will generate a random name for it
    // console.log('GOT HERE');
      
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext);
    }
  }),
	//to validate whether the file uploaded is of the acceptable extension
  fileFilter: (req, file, cb) => {
    console.log('GOT HERE');
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = { fileUpload }