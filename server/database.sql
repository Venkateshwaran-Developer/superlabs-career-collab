CREATE DATABASE superlabs_career;

CREATE TABLE jobpost(
    job_id SERIAL PRIMARY KEY,
    job_title TEXT ,
    job_location_type TEXT[] ,
    job_category TEXT ,
    job_type TEXT[] ,
    job_location TEXT[] ,
    job_experience_level VARCHAR(255) ,
    job_technical_skills TEXT[] ,
    job_education_qualification TEXT[] ,
    job_description TEXT ,
    job_interview_rounds VARCHAR(255) ,
    job_budget VARCHAR(255) ,
    job_post_date DATE ,
    job_close_date DATE ,
    job_status TEXT 
    );