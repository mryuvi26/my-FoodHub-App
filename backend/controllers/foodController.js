import foodModel from "../models/foodModel.js";
import fs from "fs";

// ADD FOOD
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Item Added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error in adding food item" });

    // delete uploaded image if error
    fs.unlink(`uploads/${image_filename}`, (err) => {
      if (err) console.log("Error deleting file:", err);
      else console.log("file deleted successfully")
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error in fetching food items" });
  }
};

const removeFood = async (req, res) => {
  try {
    const foodId = req.body.id;

    // check id
    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    // find food
    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // delete 
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.log("Error deleting image file:", err);
        }
      });
    }

    // delete food from DB
    await foodModel.findByIdAndDelete(foodId);

    res.json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error removing food item",
    });
  }
};

export { addFood, listFood, removeFood };