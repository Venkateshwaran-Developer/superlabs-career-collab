const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  title: String,
  content: [String]
});

const brandDetailSchema = new mongoose.Schema({
  variants: [variantSchema]
});

const BrandDetailModel = mongoose.model('BrandDetail', brandDetailSchema);

module.exports = BrandDetailModel;
