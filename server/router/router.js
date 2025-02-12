const {getAllJobPost,postJob, deleteJobPost} = require("../controller/JobController");
const express = require('express');
const router = express.Router();
const { postLocation, getLocation, updateLocation, deleteLocation } = require("../controller/locationController");
const { postCategory, getCategory, updateCategory, deleteCategory } = require("../controller/categoryController");
const { postUser, getUser, updateUser, deleteUser } = require("../controller/usersController");


router.post("/jobpost",postJob )

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

module.exports = router;
