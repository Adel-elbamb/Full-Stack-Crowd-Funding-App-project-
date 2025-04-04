import React from "react";
import { Route, Routes } from "react-router-dom"; 
// import Navbar from "./components/Navbar";
import ProjectsList from './pages/project-List/ProjectsList'
import Projects from './pages/Projects'
import ProjectDetails from "./pages/Project-Details/ProjectDetails";
// import SearchProjects from "./pages/SearchProjects";
// import CreateProject from "./pages/CreateProject";
// import Register from "./pages/Register";
import NotFound from "./pages/Not-Found/notfound";
import Header  from "./components/discoverHeader";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

import "bootstrap/dist/css/bootstrap.min.css";
import ThankYouPage from './pages/Thank/ThankYouPag';

function App() {
  return (
    <div className="container mt-4">
      
    <Routes>
      <Route path="/" element={<ProjectsList />} />
      <Route path="/project" element={<ProjectsList />} />
      {/* <Route path="/projects" element={<Projects />} /> */}

      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/project/:id/Thank" element={<ThankYouPage />} />

      <Route path="*" element={<NotFound />} />
      {/* <Route path="/projects" element={<ProjectDetails />} /> */}

    </Routes>
  </div>
    
  );
}

export default App;
