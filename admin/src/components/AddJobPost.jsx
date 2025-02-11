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
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../index.css";
// import { v4 as uuidv4 } from "uuid"; // Install uuid for unique IDs

function AddJobPost({ job, setJob, setIsAdd }) {
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

  const [createDate, setCreateDate] = useState(new Date().toISOString().slice(0, 10));
 
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

  // // Handling Varients
  // const [dynamicFields, setDynamicFields] = useState([
  //   { id: 1, title: "", multijobLocation: "", content: [] },
  // ]);

  // const handleDynamicInputChange = (id, event) => {
  //   const { name, value } = event.target;
  //   setDynamicFields((prevFields) =>
  //     prevFields.map((field) =>
  //       field.id === id ? { ...field, [name]: value } : field
  //     )
  //   );
  // };

  // const handleAddFields = () => {
  //   setDynamicFields((prevFields) => [
  //     ...prevFields,
  //     {
  //       id: Date.now(),
  //       title: "",
  //       multijobLocation: "",
  //       content: [],
  //       images: [],
  //       imagePreviews: [],
  //     },
  //   ]);
  // };

  // const handleKeyDown = (id, event) => {
  //   if (event.key === "Enter" && event.target.value.trim() !== "") {
  //     const newFields = dynamicFields.map((field) => {
  //       if (field.id === id) {
  //         return {
  //           ...field,
  //           content: [
  //             ...field.content,
  //             { value: event.target.value.trim(), id: uuidv4() },
  //           ],
  //           multijobLocation: "",
  //         };
  //       }
  //       return field;
  //     });
  //     setDynamicFields(newFields);
  //     event.preventDefault(); // Prevent form submission on Enter
  //   }
  // };

  // const handleRemoveFields = (id) => {
  //   setDynamicFields((prevFields) =>
  //     prevFields.filter((field) => field.id !== id)
  //   );
  // };

  // const handleRemoveValue = (fieldId, itemId) => {
  //   setDynamicFields((prevFields) =>
  //     prevFields.map((field) =>
  //       field.id === fieldId
  //         ? {
  //             ...field,
  //             content: field.content.filter((item) => item.id !== itemId),
  //           }
  //         : field
  //     )
  //   );
  // };

  // // Handling Image
  // const [images, setImages] = useState([]);
  // const [imagePreviews, setImagePreviews] = useState([]);

  // const handleFileChange = async (e) => {
  //   const files = Array.from(e.target.files);
  //   const imagePreviews = await Promise.all(
  //     files.map((file) => readFile(file))
  //   );

  //   setImages((prevImages) => [...prevImages, ...imagePreviews]);
  // };

  // const readFile = (file) => {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       resolve({ src: reader.result, file });
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // };

  // const handleRemoveImage = (index) => {
  //   const newImages = images.filter((_, i) => i !== index);
  //   const newPreviews = imagePreviews.filter((_, i) => i !== index);

  //   setImages(newImages);
  //   setImagePreviews(newPreviews);
  // };


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


  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("job_title", newJobPost.job_title);

    locationType.forEach((value) => {
      formData.append("job_location_type",value);
    });

    formData.append("job_category", newJobPost.job_category);

    jobType.forEach((value) => {
      formData.append("job_type", value);
      });

      locationValues.forEach((value) => {
        formData.append("job_location", value);
      });
    
      formData.append("job_experience_level", newJobPost.job_experience_level);
     
      techSkillsValues.forEach((value) => {
        formData.append("job_technical_skills", value);
      });

      educationalValues.forEach((value) => {
        formData.append("job_education_qualification", value);
      });

    formData.append("job_description", newJobPost.job_description);

    formData.append("job_interview_rounds", newJobPost.job_interview_rounds);
  
    formData.append("job_budget", newJobPost.job_budget);

    formData.append("job_create_date", newJobPost.job_create_date);
    
    formData.append("job_close_date", newJobPost.job_close_date);

    formData.append("job_status", newJobPost.job_status);


    // formData.append("job_location_type", newJobPost.job_location_type);
    // formData.append("job_category", newJobPost.job_category);
    // formData.append("job_type", job_location);
    // formData.append("description", newJobPost.description);

    // // formData.append("image",newJobPost.image)
    // images.forEach((image) => {
    //   formData.append("files", image.file);
    // });
    // // store every single varients to formdata
    // dynamicFields.forEach((field, index) => {
    //   formData.append(`variants[${index}][title]`, field.title);

    //   // Append each content item as a separate field
    //   field.content.forEach((contentItem, contentIndex) => {
    //     formData.append(
    //       `variants[${index}][content][${contentIndex}]`,
    //       contentItem.value
    //     );
    //   });
    // });
   
    // formData.append("category", newJobPost.category);
    // formData.append("brand", newJobPost.brand);
    // // add tags to formdata

    // locationValues.forEach((value) => {
    //   formData.append("tags", value);
    // });

    // formData.append("shippingandcustoms", newJobPost.shippingandcustoms);

    // selectedlocationValues.forEach((value) => {
    //   formData.append("deals",value);
    // });

    // formData.append("status", newJobPost.status);

    axios.post("http://localhost:3000/api/v1/jobpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
                <option name="ManagementRole" value="ManagementRole">
                  Management Role
                </option>
                <option name="DevelopmentRole" value="DevelopmentRole">
                  Development Role
                </option>
                <option name="SalesRole" value="SalesRole">
                Sales Role                
                </option>
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
          {/* <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-Josefin font-medium"
              >
                Job Location
              </Typography>
              <div className="flex gap-5 text-base">

              
              <label>
                <input
                  type="checkbox"
                  value="HotDeals"
                  className="mr-2"
                  onChange={(event) => handleDealsChange(event)}
                />
                Coimbatore
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="BestSeller"
                  className="mr-2"
                  onChange={(event) => handleDealsChange(event)}
                />
                Mumbai
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  value="NewOne"
                  className="mr-2"
                  onChange={(event) => handleDealsChange(event)}
                />
                Bangalore
              </label>
              
              </div>
            </div> */}
          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Variants
            </Typography>
            <div className="flex flex-col items-center ">
              {dynamicFields.map((field, index) => (
                <div className="flex flex-col space-y-4" key={field.id}>
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={field.title}
                      onChange={(event) =>
                        handleDynamicInputChange(field.id, event)
                      }
                      placeholder={`Variant - ${index + 1}`}
                      className="border-2 p-2 text-base"
                    />
                  </div>

                  <div className="flex flex-wrap border border-gray-300 rounded  w-[640px]">
                    {field.content.map((item) => (
                      <div
                        key={item.id}
                        className="flex text-base items-center bg-gray-200 p-1 m-1 rounded"
                      >
                        {item.value}{" "}
                        <button
                          onClick={() => handleRemoveValue(field.id, item.id)}
                          className="bg-red-500 text-white ml-2 px-2 rounded"
                        >
                          x
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      name="multijobLocation"
                      value={field.multijobLocation}
                      onChange={(event) =>
                        handleDynamicInputChange(field.id, event)
                      }
                      onKeyDown={(event) => handleKeyDown(field.id, event)}
                      placeholder="Enter locationValues"
                      className="flex-grow p-2 text-base border-0 focus:ring-0"
                    />
                  </div>

                  <button
                    className="flex justify-center pb-4 w-10 "
                    type="button"
                    onClick={() => handleRemoveFields(field.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 100 100"
                    >
                      <path d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z"></path>
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddFields}
                className="border-2 font-Josefin p-2  w-[840px] text-base"
              >
                + Add Variants
              </button>
            </div>
          </div> */}
          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Category
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Product Category"
              name="category"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.category}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div> */}
          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Category
            </Typography>
            <div className="flex text-base flex-col items-start font-Josefin ">
              <select
                id="statusDropdown"
                className="p-2 border border-gray-300 "
                name="category"
                value={newJobPost.category}
                onChange={(e) => handleSingleFieldChange(e)}
              >
                <option>Choose Category</option>
                <option name="Stationary" value="Stationary">
                  Stationary
                </option>
                <option name="Grocery" value="Grocery">
                  Grocery
                </option>
                <option name="Electronics" value="Electronics">
                  Electronics
                </option>
                <option name="Fashion" value="Fashion">
                  Fashion
                </option>
                <option name="HomeAppliances" value="HomeAppliances">
                  Home Appliances
                </option>
                <option name="Furniture" value="Furniture">
                  Furniture
                </option>
              </select>
            </div>
          </div> */}

          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Brand
            </Typography>
            <input
              color="gray"
              size="lg"
              placeholder="Enter Product Brand"
              name="brand"
              className=" border-2 w-full text-base p-2 font-Josefin "
              value={newJobPost.brand}
              onChange={(e) => handleSingleFieldChange(e)}
            />
          </div> */}
          

         
          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Shipping and Customs
            </Typography>
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
              className="mb-4 font-Josefin"
              name="shippingandcustoms"
              value={newJobPost.shippingandcustoms}
              onChange={handleConvertToText1}
            />
          </div> */}
          {/* <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-Josefin font-medium"
            >
              Image
            </Typography>

            <label className="cursor-pointer" for="upload-photo">
              Choose Product Image
            </label>
            <input
              type="file"
              name="images"
              id="upload-photo"
              className=" opacity-0"
              onChange={(e) => handleFileChange(e)}
              accept="image/*"
              multiple
            />
            <div className="flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="relative m-[10px]">
                  <img
                    src={image.src}
                    alt={`Preview ${index}`}
                    className="w-[250px] h-[150px] object-contain"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-[5px] text-sm right-[5px] bg-red-800 text-white rounded-full w-[25px] h-[25px] cursor-pointer  "
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div> */}
         
         
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
