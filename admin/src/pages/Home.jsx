import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-72"> {/* Adjusted ml-72 to match sidebar width */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
