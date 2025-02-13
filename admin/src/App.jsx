import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import JobPost from "./components/JobPost";
import Candidates from "./components/Candidates";
import Categories from "./components/Categories";
import Users from "./components/Users";
import SelectedCandidates from "./components/SelectedCandidates";
import axios from "axios";
export const ThemeContext = createContext();

function App() {
  const [job, setJob] = useState([]);

  const fetchAllData = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/jobpost");
    setJob(res.data);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  console.log(job);

  return (
    <div className="font-Josefin">
      <ThemeContext.Provider value={{ job, setJob }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="jobpost" element={<JobPost />} />
              <Route path="candidates" element={<Candidates />} />
              <Route path="categories" element={<Categories />} />
              <Route path="users" element={<Users />} />
              <Route
                path="selectedcandidates"
                element={<SelectedCandidates />}
              />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
