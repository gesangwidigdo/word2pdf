import multer from "multer";
import path from "path";
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const cleanFileName = file.originalname.replace(/\s+/g, '').replace(/\.[^.]+$/, '');
    cb(null, cleanFileName + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;