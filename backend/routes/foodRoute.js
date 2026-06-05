import express from 'express';
import {addFood, listFood, removeFood} from '../controllers/foodController.js';
import multer from 'multer';

const foodRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });-

// Route
foodRoute.post('/add-food', upload.single('image'), addFood);
foodRoute.get('/list-food', listFood);
foodRoute.delete('/remove-food', removeFood);

export default foodRoute;