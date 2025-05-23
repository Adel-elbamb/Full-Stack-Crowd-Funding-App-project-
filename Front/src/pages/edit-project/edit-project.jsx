import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EditProject.module.css";

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/projects/${id}/`)
      .then(response => {
        const project = response.data;
        setProjectData({
          ...project,
          start_date: formatDate(project.start_date),
          end_date: formatDate(project.end_date),
        });
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

    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Project updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please check your authentication.");
    }
  };

  return (
    <div className={styles.editProjectContainer}>
      <div className={styles.editProjectCard}>
        <div className={styles.leftSection}>
          <h2>Welcome Back!</h2>
          <p>To update your project details, please fill in the form.</p>
        </div>
        <div className={styles.rightSection}>
          <h2>Edit Project</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
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
