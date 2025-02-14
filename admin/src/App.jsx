import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import axios from "axios";

import MainLayout from "./components/MainLayout";
import PrivateRoute from "./components/PrivateRouter";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import JobPost from "./pages/JobPost";
import Location from "./pages/Location";
import Users from "./pages/Users";
import SelectedCandidates from "./pages/SelectedCandidates";
import Category from "./pages/Category";
import Home from "./pages/Home";

export const ThemeContext = createContext();

function App() {
  const [job, setJob] = useState([]);

  // Fetch job data
  const fetchAllData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/jobpost");
      setJob(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  console.log(job);

  return (
    <MantineProvider>
      <div className="font-Josefin">
        <ThemeContext.Provider value={{ job, setJob }}>
          <BrowserRouter>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <MainLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="jobpost" element={<JobPost />} />
                <Route path="location" element={<Location />} />
                <Route path="category" element={<Category />} />
                <Route path="users" element={<Users />} />
                <Route path="selectedcandidates" element={<SelectedCandidates />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </div>
    </MantineProvider>
  );
}

export default App;
