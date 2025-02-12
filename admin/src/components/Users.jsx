import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddUsers = ({ onClose, onSubmit, editData }) => {
  const [userName, setUserName] = useState(editData ? editData.user_title : "");
  const [userCredit, setUserCredit] = useState(editData ? editData.user_password : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData && editData.user_id) {
      // Update existing location
      
      axios
        .put(`http://localhost:3000/api/v1/users/${editData.user_id}`, { user_title: userName ,user_password: userCredit})
        .then((res) => {
          onSubmit(res.data, "update");
          onClose();
        })
        .catch((err) => console.log("Error updating User:", err));
    } else {
      // Add new location
      axios
        .post("http://localhost:3000/api/v1/users", { user_title: userName, user_password: userCredit })
        .then((res) => {
          onSubmit(res.data, "add");
          setUserName("");
          setUserCredit("");
        })
        .catch((err) => console.log("Error adding user:", err));
    }
  };

  return (
    <div className="p-4 border bg-gray-100 rounded-md shadow-lg">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold">
          {editData ? "Edit User" : "Add User"} <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter User"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded-md w-full mb-3 outline-none"
        />
        <input
          type="text"
          placeholder="Enter Password"
          value={userCredit}
          onChange={(e) => setUserCredit(e.target.value)}
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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleFormSubmit = (updatedUser, action) => {
    if (action === "add") {
      setUsers([...users, updatedUser]);
    } else if (action === "update") {
      setUsers(users.map((user) => (user.user_id === updatedUser.user_id ? updatedUser : user)));
    }
    setUserForm(false);
    setEditData(null);
  };

  const handleEdit = (user) => {
    setEditData(user);
    setUserForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3000/api/v1/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.user_id !== id));
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  return (
    <main className="bg-white h-screen w-[82vw]">
      <div className="flex justify-between items-center py-5 px-10 bg-gradient-to-r from-[#F9FAFB] to-[#D9E9F5] text-4xl">
        <h1>Users</h1>
        <button
          onClick={() => {
            setEditData(null);
            setUserForm(true);
          }}
          className="text-[18px] font-semibold border-2 bg-blue-100 text-blue-800 px-3 rounded-full"
        >
          Add User
        </button>
      </div>

      <br />
      <hr />
      <br />

      {userForm && <AddUsers onClose={() => setUserForm(false)} onSubmit={handleFormSubmit} editData={editData} />}

      <div className="py-5 px-10">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9FAFB]">
            <tr className="text-xl font-semibold">
              <th className="py-2 px-2 border text-start">S.No</th>
              <th className="py-2 px-4 border text-start">Users</th>
              <th className="py-2 px-4 border text-start">Credential</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id} className="border-b">
                <td className="py-2 px-2">{1 + index++}</td>
                <td className="py-2 px-4">{user.user_title}</td>
                <td className="py-2 px-4">{user.user_password}</td>
                <td className="py-2 px-4 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-sm font-medium border-2 bg-green-400 text-white px-3 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.user_id)}
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
AddUsers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    user_id: PropTypes.number,
    user_title: PropTypes.string,
    user_password: PropTypes.string,
  }),
};

export default Users;