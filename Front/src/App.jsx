import React from "react";
import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import ProjectsList from './pages/project-List/ProjectsList'
import ProjectDetails from "./pages/Project-Details/ProjectDetails";

// import SearchProjects from "./pages/SearchProjects";
// import CreateProject from "./pages/CreateProject";
// import Register from "./pages/Register";
import NotFound from "./pages/Not-Found/notfound";



import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import ThankYouPage from './pages/Thank/ThankYouPag';
import DeleteProject from './pages/delete-project/delete-project';
import EditProject from './pages/edit-project/edit-project';
// =====================adel=========
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateProject from "./pages/Create/CreateProject";
import Navbar from './pages/Nav/Navbar'
function App() {
  return (
    <div >
      
      <Navbar/>
      <div className="container mt-4">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/project" element={<ProjectsList />} />
      {/* <Route path="/projects" element={<Projects />} /> */}

      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/project/:id/Thank" element={<ThankYouPage />} />
      <Route path="/project/:id/edit" element={<EditProject />} />
      <Route path="/project/delete/:id" element={<DeleteProject />} />
 {/* ===========================adel================================== */}
                <Route path="/create" element={<CreateProject />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
      {/* <Route path="/projects" element={<ProjectDetails />} /> */}

    </Routes>
      </div>
  
      
      

  </div>
    
  );
}

export default App;
