const {getAllProduct,postJob, getSingleProduct,deleteProduct, updateProduct} = require("../controller/JobController");
const express = require('express');
const router = express.Router();
const { postLocation, getLocation, updateLocation, deleteLocation } = require("../controller/locationController")


router.post("/jobpost",postJob )

router.get("/product",getAllProduct)

router.put("/product/:id",updateProduct );

router.get("/product/:id",getSingleProduct );


router.delete("/product/:id", deleteProduct);

//location
//create location
router.post("/location", postLocation);
//get all location
router.get("/location", getLocation)
//update location
router.put("/location/:id", updateLocation)
//delete location
router.delete("/location/:id",deleteLocation)


module.exports = router;
