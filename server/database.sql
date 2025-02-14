CREATE DATABASE superlabs_career;

CREATE TABLE location(
    location_id SERIAL PRIMARY KEY,
    location_title VARCHAR(255)
    );
CREATE TABLE jobpost (
    job_id SERIAL PRIMARY KEY,
    job_title TEXT NOT NULL,
    job_location_type TEXT[] NOT NULL,
    job_category TEXT NOT NULL,
    job_type TEXT[] NOT NULL,
    job_location TEXT[],
    job_experience_level VARCHAR(255),
    job_technical_skills TEXT[],
    job_education_qualification TEXT[],
    job_description TEXT NOT NULL,
    job_interview_rounds VARCHAR(255),
    job_budget VARCHAR(255) NOT NULL,
    job_create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    job_close_date TIMESTAMP,
    job_status TEXT CHECK (job_status IN ('Open', 'Closed', 'Pending')) DEFAULT 'Open'
);


CREATE TABLE category(
    category_id SERIAL PRIMARY KEY,
    category_title VARCHAR(255)
    );

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_title VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255)
    );