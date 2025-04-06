import React from "react";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// =======================pages ====================================
import ProjectsList from './pages/project-List/ProjectsList'
import ProjectDetails from "./pages/Project-Details/ProjectDetails";
import Profile from './pages/profile/EditProfile'
import NotFound from "./pages/Not-Found/notfound";
import ThankYouPage from './pages/Thank/ThankYouPag';
import DeleteProject from './pages/delete-project/delete-project';
import EditProject from './pages/edit-project/edit-project';
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import CreateProject from "./pages/Create/CreateProject";
import Navbar from './pages/Nav/Navbar'
import Footer from "./components/footer/footer";
import ContactForm from "./pages/contact/contact";
import About from "./pages/about/about";
function App() {
  return (
    <div >
      
      <Navbar/>
      {/* className="container md-4"  */}
      <div  >
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/project" element={<ProjectsList />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route path="/project/:id/Thank" element={<ThankYouPage />} />
      <Route path="/project/:id/edit" element={<EditProject />} />
      <Route path="/project/delete/:id" element={<DeleteProject />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/create" element={<CreateProject />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
    <Footer/>
      </div>
  
      
      

  </div>
    
  );
}

export default App;
