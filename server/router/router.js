<<<<<<< HEAD
const {
  getAllJobPost,
  postJob,
  getSingleJobPost,
  deleteJobPost,
  updatJobPost,
} = require("../controller/JobController");
const express = require("express");
const router = express.Router();

router.post("/jobpost", postJob);
=======
const {getAllJobPost,postJob, deleteJobPost} = require("../controller/JobController");
// const { loginUser } = require("../controllers/authController");
const express = require('express');
const router = express.Router();
const { postLocation, getLocation, updateLocation, deleteLocation } = require("../controller/locationController");
const { postCategory, getCategory, updateCategory, deleteCategory } = require("../controller/categoryController");
const { postUser, getUser, updateUser, deleteUser } = require("../controller/usersController");
>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8

router.get("/jobpost", getAllJobPost);

router.put("/jobpost/:id", updatJobPost);

<<<<<<< HEAD
router.get("/jobpost/:id", getSingleJobPost);

router.delete("/jobpost/:id", deleteJobPost);
=======
router.get("/jobpost",getAllJobPost)

router.delete("/jobpost/:id", deleteJobPost);


//location
//create location
router.post("/location", postLocation);
//get all location
router.get("/location", getLocation)
//update location
router.put("/location/:id", updateLocation)
//delete location
router.delete("/location/:id",deleteLocation)

//category
//create category
router.post("/category", postCategory);
//get all category
router.get("/category", getCategory)
//update category
router.put("/category/:id", updateCategory)
//delete category
router.delete("/category/:id",deleteCategory)

//user
//create user
router.post("/users", postUser);
//get all category
router.get("/users", getUser)
//update category
router.put("/users/:id", updateUser)
//delete category
router.delete("/users/:id",deleteUser)
>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8

//auth login
// router.post("/login", loginUser)

module.exports = router;
