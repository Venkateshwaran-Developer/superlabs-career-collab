import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import "@mantine/core/styles.css";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import JobPost from "./components/JobPost";
import Location from "./components/Location";
import Users from "./components/Users";
import SelectedCandidates from "./components/SelectedCandidates";
import PrivateRoute from "./components/PrivateRouter"; // Import PrivateRoute
import LoginPage from "./components/LoginPage"; // Import Login Page
import { MantineProvider } from "@mantine/core";
import Category from "./components/Category";

export const ThemeContext = createContext();

function App() {
  const [job, setJob] = useState([]);

  return (
    <MantineProvider>
      <div className="font-Josefin">
        <ThemeContext.Provider value={{ job, setJob }}>
          <BrowserRouter>
            <Routes>
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
