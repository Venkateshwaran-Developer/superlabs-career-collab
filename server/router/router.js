const {getAllProduct,postJob, getSingleProduct,deleteProduct, updateProduct} = require("../controller/JobController");
const express = require('express');
const router = express.Router();



router.post("/jobpost",postJob )

router.get("/product",getAllProduct)

router.put("/product/:id",updateProduct );

router.get("/product/:id",getSingleProduct );


router.delete("/product/:id", deleteProduct);


module.exports = router;
