const {getAllJobPost,postJob, deleteJobPost} = require("../controller/JobController");
const express = require('express');
const router = express.Router();

router.post("/jobpost",postJob )

router.get("/jobpost",getAllJobPost)

router.delete("/jobpost/:id", deleteJobPost);


module.exports = router;
