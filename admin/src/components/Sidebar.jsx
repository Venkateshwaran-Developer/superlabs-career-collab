import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for sidebar toggle

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Job Post", path: "/jobpost" },
    { name: "Location", path: "/location" },
    { name: "Categories", path: "/category" },
    { name: "Users", path: "/users" },
    { name: "Selected Candidates", path: "/selectedcandidates" },
  ];

  return (
    <div className="w-72 bg-white shadow-lg h-screen fixed"> {/* Fixed width and height */}
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold text-blue-600">Superlabs Careers</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav className="mt-5 px-5">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block py-3 px-4 rounded-md text-gray-700 hover:bg-blue-100 transition ${location.pathname === item.path ? "bg-blue-500 text-white" : ""}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-5 mt-auto">
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
