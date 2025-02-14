import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Plus, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AddJobPost from "../components/JobPostForm";
import EditJobPost from "../components/EditJobPost";

function JobPost() {
  const [jobs, setJobs] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/jobpost");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleAdd = () => {
    setEditId(null);
    setIsAdd(true);
  };

  const handleEdit = (job) => {
    setEditId(job.job_id);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/jobpost/${deleteId}`);
      setJobs(jobs.filter((job) => job.job_id !== deleteId));
      setDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <main className="flex-grow p-6 bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-xl shadow-md w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Posts</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search by Title"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="border p-2 rounded-md outline-none"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-md"
            >
              <Plus size={18} /> Add Job
            </button>
          </div>
        </div>

        {/* Job Post Form */}
        {isAdd && <AddJobPost onClose={() => setIsAdd(false)} fetchJobs={fetchJobs} />}
        {isEdit && <EditJobPost jobId={editId} onClose={() => setIsEdit(false)} fetchJobs={fetchJobs} />}

        {/* Job Posts Table */}
        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-800">
              <tr className="text-left text-lg">
                <th className="py-3 px-4 border">Title</th>
                <th className="py-3 px-4 border">Skills</th>
                <th className="py-3 px-4 border">Experience</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job.job_id} className="border-b hover:bg-gray-100 transition">
                    <td className="py-3 px-4">{job.job_title}</td>
                    <td className="py-3 px-4">{job.job_technical_skills}</td>
                    <td className="py-3 px-4">{job.job_experience_level}</td>
                    <td className="py-3 px-4">{job.job_status}</td>
                    <td className="py-3 px-4 flex justify-center gap-4">
                      <button onClick={() => handleEdit(job)} className="text-green-600 hover:text-green-800">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => handleDelete(job.job_id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No job posts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this job post?</h2>
            <div className="flex justify-center gap-4">
              <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Yes, Delete
              </button>
              <button onClick={() => setDeleteConfirm(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default JobPost;


// import { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { ThemeContext } from "../App";
// import { useContext } from "react";
// import AddJobPost from "../components/AddJobPost";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import EditJobPost from "../components/EditJobPost";
// function JobPost() {
//   const { job, setJob } = useContext(ThemeContext);

//   const [isAdd, setIsAdd] = useState(false);
//   const [editId, setEditId] = useState("");
//   const [isEdit, setIsEdit] = useState("");
//   const [filterText, setFilterText] = useState("");
//   const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [ok, setOk] = useState(false);
//   const [id, setId] = useState();

//   const columns = [
//     {
//       name: "Title",
//       selector: (row) => row.job_title,
//       sortable: true,
//       width: "250px",
//     },
//     {
//       name: "Skills",
//       selector: (row) => row.job_technical_skills,
//       sortable: true,
//     },
//     {
//       name: "Experience",
//       selector: (row) => row.job_experience_level,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.job_status,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <div className="space-x-5">
//           <button
//             className="bg-blue-500 p-2 rounded-md "
//             onClick={() => handleEdit(row)}
//           >
//             Edit
//           </button>
//           <button
//             className="bg-red-500 p-2 rounded-md"
//             onClick={() => handleDelete(row.job_id)}
//           >
//             Delete
//           </button>
//         </div>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//     },
//   ];

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/v1/jobpost").then((res) => {
//       setJob(res.data);
//     });
//   }, [setJob]);

//   useEffect(() => {
//     axios.get("http://localhost:3000/api/v1/jobpost").then((res) => {
//       setJob(res.data);
//     });
//   }, [setJob]);

  

 
//   const filteredItems = job.filter(
//     (item) =>
//       item.job_title && item.job_title.toLowerCase().includes(filterText.toLowerCase())
//   );
//   const onFilter = (e) => setFilterText(e.target.value);
//   const handleClear = () => {
//     if (filterText) {
//       setResetPaginationToggle(!resetPaginationToggle);
//       setFilterText("");
//     }
//   };

//   function handleOpen() {
//     setIsAdd(true);
//   }

//   const handleDelete = (job_id) => {
//     setId(job_id);
//     setOk(true);
//   };

//   const handleDeleteItem = (id) => {
//     console.log(id)



//     axios.delete(`http://localhost:3000/api/v1/jobpost/${id}`)
//     .then((response) => {
//       if (response.status === 200) {
//         const filteredItems = job.filter((item) => item.job_id !== id);
//         setJob(filteredItems);
//       }
//     })
//     .catch((error) => {
//       console.error("There was an error deleting the product:", error);
//     });

//   if (isAdd)
//     return (
//       <AddJobPost
//         handleOpen={handleOpen}
//         setOpen={setOpen}
//         isAdd={isAdd}
//         job={job}
//         setJob={setJob}
//         setIsAdd={setIsAdd}
//       />
//     );
    
    
//     const handleEdit = (row)=>{    
//       setEditId(emp.job_id);
//       setIsEdit(true); 
    
//     }
//     if(isEdit) return <EditProduct  setOpen={setOpen} handleOpen={handleOpen} product={product} setJob={setJob} isEdit={isEdit} editId={editId} setIsEdit={setIsEdit}/>
    
   

//   // const handleEdit = (row) => {
//   //   setEditId(row.job_id);
//   //   setIsEdit(true);
//   // };

//   if (isEdit)
//     return (
//       <EditJobPost
//         setOpen={setOpen}
//         handleOpen={handleOpen}
//         isEdit={isEdit}
//         editId={editId}
//         setIsEdit={setIsEdit}
//         setJob={setJob}
//         setIsAdd={setIsAdd}
//       />
//     );

//   return (
//     <div>
//       <ToastContainer />
//       <div className="flex  justify-center items-center w-[82vw] h-screen bg-slate-100">
//         <div className="flex pt-7 flex-col scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll  px-10  w-[78vw] min-h-[90vh]  rounded-3xl  bg-white">
//           <div className="flex justify-between text-sm">
//             <h1>JobPost</h1>

//             <div className="flex gap-5">
//               <div className="">
//                 <input
//                   id="search"
//                   type="text"
//                   className=" border-2 p-1 rounded-sm "
//                   placeholder="Filter By Name"
//                   aria-label="Search Input"
//                   value={filterText}
//                   onChange={onFilter}
//                 />
//                 <button
//                   className="bg-black text-white border-2 p-1"
//                   type="button"
//                   onClick={handleClear}
//                 >
//                   Clear
//                 </button>
//               </div>
//               <button
//                 className="w-40 rounded-3xl h-8 flex bg-black text-white justify-center items-center"
//                 onClick={handleOpen}
//               >
//                 Create JobPost
//               </button>
//             </div>
//           </div>

//           {ok && (
//             <div className="z-50 absolute  h-full w-full flex  justify-center  pt-5 top-0 left-0">
//               <div className=" w-[400px] h-[200px] flex flex-col gap-5 items-center justify-center bg-blue-300 rounded-3xl">
//                 <h1>Are you sure you want to delete this product?</h1>
//                 <div className=" flex gap-4">
//                   <button
//                     onClick={() => {
//                       handleDeleteItem(id);
//                       setOk(false);
//                     }}
//                     className=" px-4 py-2 rounded-xl bg-red-700"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={() => setOk(false)}
//                     className=" px-4 py-2 rounded-xl bg-blue-500"
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <DataTable
//               columns={columns}
//               data={filteredItems}
//               pagination
//               paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
//               persistTableHead
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// }
// export default JobPost;
