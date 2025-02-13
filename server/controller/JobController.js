<<<<<<< HEAD
const client = require("../config/connectdatabase");
const ProductDetailModel = require("../model/productDetail");
=======
const client =require( "../config/connectdatabase");
>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8

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
<<<<<<< HEAD

=======
    
>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8
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

const getAllJobPost = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM jobpost");
<<<<<<< HEAD
    res.json(result.rows);
=======
  res.json(result.rows); 
>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

<<<<<<< HEAD
const getSingleJobPost = async (req, res) => {
  console.log(req.params.id);

  try {
    const singleJobPost = await client.query(
      `SELECT * FROM jobpost WHERE job_id = $1`,
      [req.params.id]
    );
    if (!singleJobPost.rows[0])
      return res.status(404).send("Job post not found");
    res.json(singleJobPost.rows[0]);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
=======
const deleteJobPost = async (req, res) => {
  
  const { id } = req.params;
  console.log(id);
  try {
    await client.query("DELETE FROM jobpost WHERE job_id = $1", [id]);
    res.json({ message: "Job posting deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Failed to delete job posting" });
      }
      };

>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8

const deleteJobPost = async (req, res) => {
  try {
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const updatJobPost = async (req, res) => {
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

    const { id } = req.params;

    const updateJobPost = await client.query(
      `UPDATE jobpost SET  
      job_title= $1,  
      job_location_type=$2, 
      job_category= $3, 
      job_type=$4,  
      job_location= $5, 
      job_experience_level=$6, 
      job_technical_skills=$7,  
      job_education_qualification= $8,  
      job_description= $9,   
      job_interview_rounds= $10, 
      job_budget=$11,
      job_create_date=$12,  
      job_close_date=$13,  
      job_status=$14
      WHERE job_id = $15 
      RETURNING *`,
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
        id,
      ]
    );

    if (!updateJobPost.rows[0])
      return res.status(404).send("Job Post not found");
    res.status(200).json(updateJobPost.rows[0]);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getAllJobPost,
  postJob,
<<<<<<< HEAD
  deleteJobPost,
  getSingleJobPost,
  updatJobPost,
=======
  deleteJobPost
>>>>>>> 7dc2279a4973043826b58b564a85c137b1c8d9b8
};
