import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddCategory
 = ({ onClose, onSubmit, editData }) => {
  const [categoryName, setCategoryName] = useState(editData ? editData.category_title : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData && editData.category_id) {
      // Update existing location
      axios
        .put(`http://localhost:3000/api/v1/category/${editData.category_id}`, { category_title: categoryName })
        .then((res) => {
          onSubmit(res.data, "update");
          onClose();
        })
        .catch((err) => console.log("Error updating category:", err));
    } else {
      // Add new location
      axios
        .post("http://localhost:3000/api/v1/category", { category_title: categoryName })
        .then((res) => {
          onSubmit(res.data, "add");
          setCategoryName(""); // Clear input
        })
        .catch((err) => console.log("Error adding category:", err));
    }
  };

  return (
    <div className="p-4 border bg-gray-100 rounded-md shadow-lg">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold">
          {editData ? "Edit Category" : "Add Category"} <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 rounded-md w-full mb-3 outline-none"
        />
        <div className="flex gap-3">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            {editData ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:3000/api/v1/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const handleFormSubmit = (updatedCategory, action) => {
    if (action === "add") {
      setCategories([...categories, updatedCategory]);
    } else if (action === "update") {
      setCategories(categories.map((cat) => (cat.category_id === updatedCategory.category_id ? updatedCategory : cat)));
    }
    setCategoryForm(false);
    setEditData(null);
  };

  const handleEdit = (category) => {
    setEditData(category);
    setCategoryForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      axios
        .delete(`http://localhost:3000/api/v1/category/${id}`)
        .then(() => {
          setCategories(categories.filter((cat) => cat.category_id !== id));
        })
        .catch((err) => console.error("Error deleting category:", err));
    }
  };

  return (
    <main className="bg-white h-screen w-[82vw]">
      <div className="flex justify-between items-center py-5 px-10 bg-gradient-to-r from-[#F9FAFB] to-[#D9E9F5] text-4xl">
        <h1>Category</h1>
        <button
          onClick={() => {
            setEditData(null);
            setCategoryForm(true);
          }}
          className="text-[18px] font-semibold border-2 bg-blue-100 text-blue-800 px-3 rounded-full"
        >
          Add Category
        </button>
      </div>

      <br />
      <hr />
      <br />

      {categoryForm && <AddCategory onClose={() => setCategoryForm(false)} onSubmit={handleFormSubmit} editData={editData} />}

      <div className="py-5 px-10">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9FAFB]">
            <tr className="text-xl font-semibold">
              <th className="py-2 px-2 border text-start">S.No</th>
              <th className="py-2 px-4 border text-start">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.category_id} className="border-b">
                <td className="py-2 px-2">{1 + index++}</td>
                <td className="py-2 px-4">{category.category_title}</td>
                <td className="py-2 px-4 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-sm font-medium border-2 bg-green-400 text-white px-3 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(location.category_id)}
                    className="text-sm font-medium border-2 bg-red-400 text-white px-3 rounded-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
AddCategory.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    location_id: PropTypes.number,
    location_title: PropTypes.string,
  }),
};

export default Category;
