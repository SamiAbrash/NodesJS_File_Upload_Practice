const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(file.originalname); // extract the original file extension.
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // append the file extension.
    }
  });
  
  const upload = multer({ storage: storage });

  app.post('/api/upload', upload.single('file'), (req,res) => {
    if(!req.file)
    {
        return res.status(400).send({ message: 'No file uploaded.' });
    }
    res.send(`file uploaded: ${req.file.filename}`);
  });

  app.listen(PORT, () => {
    console.log(`application running on port: ${PORT}`);
  });