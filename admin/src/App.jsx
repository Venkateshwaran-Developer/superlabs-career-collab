import { BrowserRouter, Routes, Route } from "react-router-dom";
import {createContext, useState} from 'react';
import '@mantine/core/styles.css';
import Dashboard from './pages/Dashboard';
import JobPost from "./components/JobPost";
import Location from "./pages/Location";
import Users from "./pages/Users";
import SelectedCandidates from "./pages/SelectedCandidates";
export const ThemeContext = createContext();
import { MantineProvider } from '@mantine/core';
import Category from "./pages/Category";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";



function App() {

  const [job , setJob] =useState([]);

  
  return (
    <MantineProvider>
    <div className="font-Josefin">
     <ThemeContext.Provider value={{job,setJob}}>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<Dashboard />} />
          <Route path="jobpost" element={<JobPost />} />
          <Route path="location" element={<Location />} />
          <Route path="category" element={<Category />} />
          <Route path="users" element={<Users />} />
          <Route path="selectedcandidates" element={<SelectedCandidates />} />
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeContext.Provider>
    </div>
    </MantineProvider>
  )
}

export default App
