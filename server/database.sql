CREATE DATABASE superlabs_career;

CREATE TABLE location(
    location_id SERIAL PRIMARY KEY,
    location_title VARCHAR(255)
    );
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
    job_create_date TEXT ,
    job_close_date TEXT ,
    job_status TEXT 
    );

CREATE TABLE category(
    category_id SERIAL PRIMARY KEY,
    category_title VARCHAR(255)
    );

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_title VARCHAR(255),
    user_password VARCHAR(255)
    );