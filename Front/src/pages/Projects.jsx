import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);  // Store fetched projects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects/")
      .then(response => {
        setProjects(response.data);  // Store projects in state
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);  // Runs once when component mounts

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.details}</p>
            <p><strong>Target:</strong> {project.total_target} EGP</p>
            <p><strong>Start:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
            <p><strong>End:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;