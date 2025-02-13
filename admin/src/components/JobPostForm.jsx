import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
  Typography,
  IconButton,
  Input,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const [createDate, setCreateDate] = useState();
 
  const handleCreatedDate = (e) =>{
    setCreateDate(e.target.value);
    setNewJobPost({ ...newJobPost, job_create_date:createDate });
  }
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
    <Dialog open={open} handler={handleOpen} size="lg" className="p-4 h-[600px] overflow-y-scroll scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300">
      <DialogHeader className="relative font-Josefin space-y-4 pb-6">
        <Typography variant="h4" color="blue-gray">Create your JobPost</Typography>
        <Typography className="mt-1 font-medium text-gray-600">Complete the form below with your job details.</Typography>
        <IconButton size="sm" variant="text" className="!absolute right-3.5 top-3.5" onClick={handleClose}>
          <XMarkIcon className="h-4 w-4 stroke-2" />
        </IconButton>
      </DialogHeader>
      
      <div className="space-y-4">
        <Input label="Job Name" name="job_title" value={newJobPost.job_title} onChange={handleSingleFieldChange} />
        
        <Typography variant="small" className="font-medium">Job Location Type</Typography>
        <div className="flex gap-5">
          {['Onsite', 'Remote'].map(type => (
            <Checkbox key={type} label={type} value={type} onChange={handleLocationType} />
          ))}
        </div>
        
        <Select label="Job Category" name="job_category" value={newJobPost.job_category} onChange={handleSingleFieldChange}>
          <Option value="">Choose your job category</Option>
          {category.map(({ category_id, category_title }) => (
            <Option key={category_id} value={category_title}>{category_title}</Option>
          ))}
        </Select>
        
        <Typography variant="small" className="font-medium">Job Type</Typography>
        <div className="flex gap-5">
          {['FullTime', 'PartTime', 'Internship', 'Contract'].map(type => (
            <Checkbox key={type} label={type} value={type} onChange={handleJobType} />
          ))}
        </div>
        
        <Input label="Experience Level" name="job_experience_level" value={newJobPost.job_experience_level} onChange={handleSingleFieldChange} />
        
        <Typography variant="small" className="font-medium">Job Description</Typography>
        <ReactQuill className="mb-4" value={newJobPost.job_description} onChange={handleJobDescription} />
        
        <Input label="Interview Rounds" name="job_interview_rounds" value={newJobPost.job_interview_rounds} onChange={handleSingleFieldChange} />
        
        <Input label="Budget" name="job_budget" value={newJobPost.job_budget} onChange={handleSingleFieldChange} />
        
        <Typography variant="small" className="font-medium">Created Date</Typography>
        <Input type="date" value={createDate} onChange={handleCreatedDate} />
        
        <Typography variant="small" className="font-medium">Valid Through</Typography>
        <Input type="date" value={closeDate} onChange={handleCloseDate} />
        
        <Select label="Status" name="job_status" value={newJobPost.job_status} onChange={handleSingleFieldChange}>
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </div>
      
      <DialogFooter>
        <Button onClick={handleSubmit} color="blue">Submit</Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AddJobPost;
