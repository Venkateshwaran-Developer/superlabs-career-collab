import { BrowserRouter, Routes, Route } from "react-router-dom";
import {createContext, useState} from 'react';
import '@mantine/core/styles.css';
import MainLayout from "./components/MainLayout";
import Dashboard from './components/Dashboard';
import JobPost from "./components/JobPost";
import Location from "./components/Location";
import Categories from "./components/Categories";
import Users from "./components/Users";
import SelectedCandidates from "./components/SelectedCandidates";
export const ThemeContext = createContext();
import { MantineProvider } from '@mantine/core';



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
          <Route path="categories" element={<Categories />} />
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
