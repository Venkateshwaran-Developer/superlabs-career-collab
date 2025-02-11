const client =require( "../config/connectdatabase");
const ProductDetailModel = require("../model/productDetail");

const postJob = async (req, res) => {
  try {
    const {
      job_title,
      job_location_type,
      job_category,
      job_type,
      job_location,
      job_experience_level,
      job_technical_skills,
      job_education_qualification,
      job_description,
      job_interview_rounds,
      job_budget,
      job_create_date,
      job_close_date,
      job_status,
    } = req.body;
    
    
    const newJob = await client.query(
      `INSERT INTO jobpost (job_title,job_location_type,job_category,job_type,job_location,job_experience_level,job_technical_skills,job_education_qualification,job_description,job_interview_rounds,job_budget,job_create_date,job_close_date,job_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [
        job_title,
        job_location_type,
        job_category,
        job_type,
        job_location,
        job_experience_level,
        job_technical_skills,
        job_education_qualification,
        job_description,
        job_interview_rounds,
        job_budget,
        job_create_date,
        job_close_date,
        job_status,
      ]
    );

    res.json(newJob.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to create job posting" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await ProductDetailModel.find();
    res.send(product);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await ProductDetailModel.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const user = await ProductDetailModel.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    console.log(req.body);

    const singleUser = await ProductDetailModel.findById(req.params.id);

    const filenamesToUpdate = req.files.map((file) => file.filename);
    const imageId = req.params.id;

    // Fetch existing images from the database
    const existingImages = await ProductDetailModel.findById(imageId).exec();

    // Create a copy of the existing images to work with
    let updatedImages = [...existingImages.images];

    // Get the list of images to remove from the request body
    const imagesToRemove = req.body.imagesToRemove || []; // Ensure this is an array

    // Check if there are images to remove
    if (imagesToRemove.length > 0) {
      // Condition to remove specified images only if there are any to remove
      updatedImages = updatedImages.filter(
        (image) => !imagesToRemove.includes(image)
      );
    }

    // Combine existing images with new uploads
    const updatedFilenamesList = [...updatedImages, ...filenamesToUpdate];

    // If you want to update the database, do it here:
    existingImages.images = updatedFilenamesList;
    await existingImages.save();

    console.log("Original Images:", existingImages.images);
    console.log("Images to Remove:", imagesToRemove);
    console.log("Updated Images After Removal:", updatedImages);

    const user = await ProductDetailModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || singleUser.title,
        price: req.body.price || singleUser.price,
        description: req.body.description || singleUser.description,
        images: existingImages.images,
        variants: req.body.variants || singleUser.variants,
        category: req.body.category || singleUser.category,
        brand: req.body.brand || singleUser.brand,
        tags: req.body.tags || singleUser.tags,
        shippingandcustoms:
          req.body.shippingandcustoms || singleUser.shippingandcustoms,
        status: req.body.status || singleUser.status,
        deals: req.body.deals || singleUser.deals,
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  getAllProduct,
  postJob,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};
