import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddLocation = ({ onClose, onSubmit, editData }) => {
  const [locationName, setLocationName] = useState(editData ? editData.location_title : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData && editData.location_id) {
      // Update existing location
      axios
        .put(`http://localhost:3000/api/v1/location/${editData.location_id}`, { location_title: locationName })
        .then((res) => {
          onSubmit(res.data, "update");
          onClose();
        })
        .catch((err) => console.log("Error updating location:", err));
    } else {
      // Add new location
      axios
        .post("http://localhost:3000/api/v1/location", { location_title: locationName })
        .then((res) => {
          onSubmit(res.data, "add");
          setLocationName(""); // Clear input
        })
        .catch((err) => console.log("Error adding location:", err));
    }
  };

  return (
    <div className="p-4 border bg-gray-100 rounded-md shadow-lg">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-semibold">
          {editData ? "Edit Location" : "Add Location"} <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Location"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
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

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [locationForm, setLocationForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    axios
      .get("http://localhost:3000/api/v1/location")
      .then((res) => setLocations(res.data))
      .catch((err) => console.error("Error fetching locations:", err));
  };

  const handleFormSubmit = (updatedLocation, action) => {
    if (action === "add") {
      setLocations([...locations, updatedLocation]);
    } else if (action === "update") {
      setLocations(locations.map((loc) => (loc.location_id === updatedLocation.location_id ? updatedLocation : loc)));
    }
    setLocationForm(false);
    setEditData(null);
  };

  const handleEdit = (location) => {
    setEditData(location);
    setLocationForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this location?")) {
      axios
        .delete(`http://localhost:3000/api/v1/location/${id}`)
        .then(() => {
          setLocations(locations.filter((loc) => loc.location_id !== id));
        })
        .catch((err) => console.error("Error deleting location:", err));
    }
  };

  return (
    <main className="flex justify-center items-center h-screen w-[82vw]">
    <div className="flex pt-7 flex-col scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll  px-10  w-[78vw] min-h-[90vh]  rounded-3xl  bg-white">

      <div className="flex justify-between items-center py-5 px-10 bg-gradient-to-r from-[#F9FAFB] to-[#D9E9F5] text-4xl">
        <h1>Locations</h1>
        <button
          onClick={() => {
            setEditData(null);
            setLocationForm(true);
          }}
          className="text-[18px] font-semibold border-2 bg-blue-100 text-blue-800 px-3 rounded-full"
        >
          Add Location
        </button>
      </div>

      <br />
      <hr />
      <br />

      {locationForm && <AddLocation onClose={() => setLocationForm(false)} onSubmit={handleFormSubmit} editData={editData} />}

      <div className="py-5 px-10">
        <table className="w-full border-collapse">
          <thead className="bg-[#F9FAFB]">
            <tr className="text-xl font-semibold">
              <th className="py-2 px-2 border text-start">S.No</th>
              <th className="py-2 px-4 border text-start">Location</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={location.location_id} className="border-b">
                <td className="py-2 px-2">{1 + index++}</td>
                <td className="py-2 px-4">{location.location_title}</td>
                <td className="py-2 px-4 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(location)}
                    className="text-sm font-medium border-2 bg-green-400 text-white px-3 rounded-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(location.location_id)}
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
      </div>
    </main>
  );
};
AddLocation.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    location_id: PropTypes.number,
    location_title: PropTypes.string,
  }),
};

// export default Location;
export default Location;
