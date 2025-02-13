import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Edit, Trash2 } from "lucide-react";

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
      axios
        .put(`http://localhost:3000/api/v1/users/${editData.user_id}`, { user_title: userName, user_password: userCredit })
        .then((res) => {
          onSubmit(res.data, "update");
          onClose();
        })
        .catch((err) => console.log("Error updating User:", err));
    } else {
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
    <div className="p-6 border bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold text-gray-700">
          {editData ? "Edit User" : "Add User"} <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter User"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={userCredit}
          onChange={(e) => setUserCredit(e.target.value)}
          className="border p-2 rounded-md w-full mb-4 outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div className="flex gap-3 justify-end">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            {editData ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
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
    <main className="flex flex-col items-center w-full px-6 py-6">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-2xl font-bold text-gray-700">Users</h1>
          <button
            onClick={() => {
              setEditData(null);
              setUserForm(true);
            }}
            className="text-sm font-medium border bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Add User
          </button>
        </div>

        {userForm && <AddUsers onClose={() => setUserForm(false)} onSubmit={handleFormSubmit} editData={editData} />}

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-sm font-semibold text-gray-700">
                <th className="py-3 px-4 border text-start">S.No</th>
                <th className="py-3 px-4 border text-start">Username</th>
                <th className="py-3 px-4 border text-start">Password</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.user_id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.user_title}</td>
                    <td className="py-3 px-4">{user.user_password}</td>
                    <td className="py-3 px-4 flex justify-center gap-4">
                      <button onClick={() => handleEdit(user)} className="text-green-600 hover:text-green-800">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => handleDelete(user.user_id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">No users available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

AddUsers.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.object,
};

export default Users;
