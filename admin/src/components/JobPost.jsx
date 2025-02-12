import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ThemeContext } from "../App";
import { useContext } from "react";
import AddJobPost from "./AddJobPost";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditProduct from "./EditProduct";
function JobPost() {
  const { job, setJob } = useContext(ThemeContext);
    
  const [isAdd, setIsAdd] = useState(false);
  const [editId,setEditId]=useState('');
  const [isEdit,setIsEdit]=useState('');
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [id, setId] = useState();

  const columns = [
    {
      name: "Title",
      selector: (row) => row.job_title,
      sortable: true,
      width: "250px",
    },
    {
      name: "Skills",
      selector: (row) => row.job_technical_skills,
      sortable: true,
    },
    {
      name: "Experience",
      selector: (row) => row.job_experience_level,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.job_status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-5">
          <button
            className="bg-blue-500 p-2 rounded-md "
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 p-2 rounded-md"
            onClick={() => handleDelete(row.job_id)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

  

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/jobpost").then((res) => {
      setJob(res.data);
    });
  }, [setJob]);

  

 
  const filteredItems = job.filter(
    (item) =>
      item.job_title && item.job_title.toLowerCase().includes(filterText.toLowerCase())
  );
  const onFilter = (e) => setFilterText(e.target.value);
  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };


  function handleOpen() {
    setIsAdd(true);
  }

  const handleDelete = (job_id) => {
    setId(job_id);
    setOk(true);
  };

  const handleDeleteItem = (id) => {
    console.log(id)



    axios.delete(`http://localhost:3000/api/v1/jobpost/${id}`)
    .then((response) => {
      if (response.status === 200) {
        const filteredItems = job.filter((item) => item.job_id !== id);
        setJob(filteredItems);
      }
    })
    .catch((error) => {
      console.error("There was an error deleting the product:", error);
    });

}
 
 
 
  
  if (isAdd) return (
      <AddJobPost
        handleOpen={handleOpen}
        setOpen={setOpen}
        isAdd={isAdd}
        job={job}
        setJob={setJob}
        setIsAdd={setIsAdd}
      />
    );
    
    
    const handleEdit = (row)=>{    
      setEditId(emp.job_id);
      setIsEdit(true); 
    
    }
    if(isEdit) return <EditProduct  setOpen={setOpen} handleOpen={handleOpen} product={product} setJob={setJob} isEdit={isEdit} editId={editId} setIsEdit={setIsEdit}/>
    
   


  return (
    <div>
      <ToastContainer />
      <div className="flex  justify-center items-center w-[82vw] h-screen bg-slate-100">
        <div className="flex pt-7 flex-col scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll  px-10  w-[78vw] min-h-[90vh]  rounded-3xl  bg-white">
          <div className="flex justify-between text-sm">
            <h1>JobPost</h1>

            <div className="flex gap-5">
              <div className="">
                <input
                  id="search"
                  type="text"
                  className=" border-2 p-1 rounded-sm "
                  placeholder="Filter By Name"
                  aria-label="Search Input"
                  value={filterText}
                  onChange={onFilter}
                />
                <button
                  className="bg-black text-white border-2 p-1"
                  type="button"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
              <button
                className="w-40 rounded-3xl h-8 flex bg-black text-white justify-center items-center"
                onClick={handleOpen}
              >
                Create JobPost
              </button>
            </div>
          </div>

          {ok && (
            <div className="z-50 absolute  h-full w-full flex  justify-center  pt-5 top-0 left-0">
      <div className=" w-[400px] h-[200px] flex flex-col gap-5 items-center justify-center bg-blue-300 rounded-3xl">
        <h1>Are you sure you want to delete this product?</h1>
        <div className=" flex gap-4">
          <button
            onClick={() => {
              handleDeleteItem(id);
                setOk(false)
            }}
            className=" px-4 py-2 rounded-xl bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => setOk(false)}
            className=" px-4 py-2 rounded-xl bg-blue-500"
          >
            No
          </button>
        </div>
      </div>
    </div>
          )}

          <div>
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              persistTableHead
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobPost;
