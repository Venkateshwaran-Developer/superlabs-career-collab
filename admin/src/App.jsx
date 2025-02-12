import { BrowserRouter, Routes, Route } from "react-router-dom";
import {createContext, useState} from 'react';
import '@mantine/core/styles.css';
import MainLayout from "./components/MainLayout";
import Dashboard from './components/Dashboard';
import JobPost from "./components/JobPost";
import Location from "./components/Location";
import Users from "./components/Users";
import SelectedCandidates from "./components/SelectedCandidates";
export const ThemeContext = createContext();
import { MantineProvider } from '@mantine/core';
import Category from "./components/Category";



function App() {

  const [job , setJob] =useState([]);

  
  return (
    <MantineProvider>
    <div className="font-Josefin">
     <ThemeContext.Provider value={{job,setJob}}>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path="jobpost" element={<JobPost />} />
          <Route path="location" element={<Location />} />
          <Route path="category" element={<Category />} />
          <Route path="users" element={<Users />} />
          <Route path="selectedcandidates" element={<SelectedCandidates />} />
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
