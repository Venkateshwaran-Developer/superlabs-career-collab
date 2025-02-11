const mongoose = require("mongoose");


const variantSchema = new mongoose.Schema({
  title: String,
  content: [String],
});

const ProductDetailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  images:  [String],
  variants: [variantSchema],
  category: { type: String, required: true },
  brand: { type: String, required: true },
  tags: [String],
  shippingandcustoms: { type: String, required: true },
  status: { type: String, required: true },
  deals:[String],
  created_at: { type: Date, default: Date.now },
});

const ProductDetailModel = mongoose.model("Product", ProductDetailSchema);

module.exports = ProductDetailModel; //export the model
