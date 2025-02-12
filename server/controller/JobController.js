const client =require( "../config/connectdatabase");

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

const getAllJobPost = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM jobpost");
  res.json(result.rows); 
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

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


module.exports = {
  getAllJobPost,
  postJob,
  deleteJobPost
};
