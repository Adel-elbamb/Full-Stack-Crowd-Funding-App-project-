import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./edit-project.css";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    details: "",
    total_target: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/projects/${id}/`)
      .then(response => {
        setProjectData(response.data);
      })
      .catch(error => {
        console.error("Error fetching project data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, projectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      alert("Project updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project");
    }
  };

  return (
    <div className="edit-project-container">
      <div className="edit-project-card">
        <div className="left-section">
          <h2>Welcome Back!</h2>
          <p>To update your project details, please fill in the form.</p>
        </div>
        <div className="right-section">
          <h2>Edit Project</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Project Title" value={projectData.title} onChange={handleChange} required />
            <textarea name="details" placeholder="Project Details" value={projectData.details} onChange={handleChange} required></textarea>
            <input type="number" name="total_target" placeholder="Total Target" value={projectData.total_target} onChange={handleChange} required />
            <input type="date" name="start_date" value={projectData.start_date} onChange={handleChange} required />
            <input type="date" name="end_date" value={projectData.end_date} onChange={handleChange} required />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
