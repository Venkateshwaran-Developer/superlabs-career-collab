import {
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../index.css";


function AddJobPost({ job, setJob, setIsAdd }) {
  const [category, setCategory] = useState([]);
   const [newJobPost, setNewJobPost] = useState([
    {
      job_title: "",
      job_location_type: [],
      job_category: "",
      job_type: [],
      job_location: "",
      job_experience_level: "",
      job_technical_skills: "",
      job_education_qualification: "",
      job_description: "",
      job_interview_rounds: "",
      job_budget: "",
      job_create_date: "",
      job_close_date: "",
      job_status:""
    },
  ]);

  function handleOpen() {
    setOpen(!open);
  }

  function handleClose() {
    setIsAdd(false);
  }

  const handleSingleFieldChange = (e) => {
    setNewJobPost({ ...newJobPost, [e.target.name]: e.target.value });
  };

  // Job Created Date

  const [createDate, setCreateDate] = useState();
 
  const handleCreatedDate = (e) =>{
    setCreateDate(e.target.value);
    setNewJobPost({ ...newJobPost, job_create_date:createDate });
  }


   // Job Close Date

   const [closeDate, setCloseDate] = useState();
 
   const handleCloseDate = (e) =>{
    setCloseDate(e.target.value);
     setNewJobPost({ ...newJobPost, job_close_date:closeDate });
   }


 
  // Job Description

  const handleJobDescription = (value) => {
      setNewJobPost({ ...newJobPost, job_description: value });
  };



   // Educational Qualification

   const [education, setEducation] = useState("");
   const [educationalValues, setEducationalValues] = useState([]);
 
   const handleInputEducationChange = (e) => {
    setEducation(e.target.value);
   };
 
   const handleKeyDownEducation = (e) => {
     if (e.key === "Enter") {
       addEduValue();
     }
   };
 
   const addEduValue = () => {
     if (education !== "") {
      setEducationalValues([...educationalValues, education]);
      setEducation("");
     }
   };
 
   const removeEducation = (index) => {
     const newlocationValues = educationalValues.filter((_, i) => i !== index);
     setEducationalValues(newlocationValues);
   };



   // Mandatory Technical Skills

   const [jobTechSkills, setJobTechSkills] = useState("");
   const [techSkillsValues, setTechSkillsValues] = useState([]);
 
   const handleInputTechSkillsChange = (e) => {
    setJobTechSkills(e.target.value);
   };
 
   const handleKeyDownTechSkills = (e) => {
     if (e.key === "Enter") {
       addTechValue();
     }
   };
 
   const addTechValue = () => {
     if (jobTechSkills !== "") {
      setTechSkillsValues([...techSkillsValues, jobTechSkills]);
       setJobTechSkills("");
     }
   };
 
   const removeTechnicalSkills = (index) => {
     const newlocationValues = techSkillsValues.filter((_, i) => i !== index);
     setTechSkillsValues(newlocationValues);
   };


  // Job Location

  const [jobLocation, setJobLocation] = useState("");
  const [locationValues, setLocationValues] = useState([]);

  const handleInputLocationChange = (e) => {
    setJobLocation(e.target.value);
  };

  const handleKeyDownJobLocation = (e) => {
    if (e.key === "Enter") {
      addValue();
    }
  };

  const addValue = () => {
    if (jobLocation !== "") {
      setLocationValues([...locationValues, jobLocation]);
      setJobLocation("");
    }
  };

  const removeJobLocation = (index) => {
    const newlocationValues = locationValues.filter((_, i) => i !== index);
    setLocationValues(newlocationValues);
  };

  // Job Location Type

  const [locationType, setLocationType] = useState([]);

  const handleLocationType = (event) => {
    const value = event.target.value;
    setLocationType((prevlocationValues) =>
      prevlocationValues.includes(value)
        ? prevlocationValues.filter((v) => v !== value)
        : [...prevlocationValues, value]
    );
  };

   // Job Type

   const [jobType, setJobType] = useState([]);

   const handleJobType = (event) => {
     const value = event.target.value;
     setJobType((prevlocationValues) =>
       prevlocationValues.includes(value)
         ? prevlocationValues.filter((v) => v !== value)
         : [...prevlocationValues, value]
     );
   };

   useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/category")
    .then((response) => {
      setCategory(response.data);
      })

  })


  function handleSubmit(e) {
    e.preventDefault();
    
   

    axios.post("http://localhost:3000/api/v1/jobpost", {
      job_title:newJobPost.job_title,
      job_location_type:locationType,
      job_category:newJobPost.job_category,
      job_type:jobType,
      job_location:locationValues,
      job_experience_level:newJobPost.job_experience_level,
      job_technical_skills:techSkillsValues,
      job_education_qualification:educationalValues,
      job_description:newJobPost.job_description,
      job_interview_rounds:newJobPost.job_interview_rounds,
      job_budget:newJobPost.job_budget,
      job_create_date:createDate,
      job_close_date:closeDate,
      job_status:newJobPost.job_status,

    }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        setJob([...job, res.data]);
        setIsAdd(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="p-4  scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-[600px] overflow-y-scroll"
      >
        <DialogHeader className="relative font-Josefin  block space-y-4 pb-6">
          <Typography className="font-Josefin" variant="h4" color="blue-gray">
            Create your JobPost
          </Typography>
          <Typography className="mt-1 font-Josefin font-medium text-gray-600">
            Complete the form below with your job details.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Title
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Job Title"
              name="job_title"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.job_title}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>
          <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-Josefin font-medium"
              >
                Job Location Type
              </Typography>
              <div className="flex gap-5 text-base">

              <label>
                <input
                  type="checkbox"
                  value="Onsite"
                  className="mr-2"
                 
                  onChange={(event) => handleLocationType(event)}
                />
                Onsite
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="Remote"
                  className="mr-2"
                  onChange={(event) => handleLocationType(event)}
                />
                Remote
              </label>
              
              
              </div>
            </div>
         
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Category
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_category"
                value={newJobPost.job_category}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose your job Category</option>
                {
                  category.map((category) => (
                    <option key={category.category_id} value={category.category_title}>{category.category_title}</option>))
                }
              </select>
            </div>
          </div>
          <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-Josefin font-medium"
              >
                Job Type
              </Typography>
              <div className="flex gap-5 text-base">

              
              <label>
                <input
                  type="checkbox"
                  value="FullTime"
                  className="mr-2"
                 
                  onChange={(event) => handleJobType(event)}
                />
                Full Time
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="PartTime"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Part Time
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="Intership"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Intership
              </label>
              <br/>
              <label>
                <input
                  type="checkbox"
                  value="Contract"
                  className="mr-2"
                  onChange={(event) => handleJobType(event)}
                />
                Contract
              </label>
              </div>
            </div>
            <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Job Location
            </Typography>
            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {locationValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeJobLocation(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={jobLocation}

                  onChange={handleInputLocationChange}
                  onKeyDown={handleKeyDownJobLocation}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
          </div>
            <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Experience Level
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Experience Level"
              name="job_experience_level"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.job_experience_level}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Mandatory Technical Skills
            </Typography>
            
            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {techSkillsValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeTechnicalSkills(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={jobTechSkills}
                  onChange={handleInputTechSkillsChange}
                  onKeyDown={handleKeyDownTechSkills}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Education Qualification
            </Typography>
            
            <div className="flex flex-col items-start ">
              <div className="flex flex-wrap border border-gray-300 rounded  w-full">
                {educationalValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                  >
                    {value}{" "}
                    <button
                      onClick={() => removeEducation(index)}
                      className="bg-red-500 text-white ml-2 px-2 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={education}
                  onChange={handleInputEducationChange}
                  onKeyDown={handleKeyDownEducation}
                  placeholder="Enter a value and press Enter"
                  className="flex-grow p-2 text-base border-0 focus:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="font-Josefin">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium font-Josefin"
            >
             Job Description
            </Typography>
            <div>
              <ReactQuill
                modules={{
                  toolbar: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image"],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "font",
                  "list",
                  "bullet",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "link",
                  "image",
                  "align",
                ]}
                className="mb-4 "
                value={newJobPost.job_description}
                onChange={handleJobDescription}
              />
            </div>
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Interview Rounds
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Interview Rounds"
              name="job_interview_rounds"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.job_interview_rounds}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>
     
         
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2  text-left font-Josefin font-medium "
            >
              Budget
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Job Budget"
              name="job_budget"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.job_budget}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div>

        

          <div>
          <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Created Date
            </Typography>
            <div>
            <input 
                type="date" 
                value={createDate} 
                onChange={(e) => handleCreatedDate(e)} 
              />
            </div>

          </div>
          <div>
          <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Valid Through
            </Typography>
            <div>
            <input 
                type="date" 
                value={closeDate} 
                onChange={(e) => handleCloseDate(e)} 
              />
            </div>

          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Status
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="job_status"
                value={newJobPost.job_status}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Status</option>
                <option name="Active" value="Active">
                  Active
                </option>
                <option name="Inactive" value="Inactive">
                  Inactive
                </option>
              </select>
             
            </div>
           
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit} className="ml-auto">
            submit
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default AddJobPost;
