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

router.get("/jobpost", getAllJobPost);

router.put("/jobpost/:id", updatJobPost);

router.get("/jobpost/:id", getSingleJobPost);

router.delete("/jobpost/:id", deleteJobPost);

module.exports = router;
