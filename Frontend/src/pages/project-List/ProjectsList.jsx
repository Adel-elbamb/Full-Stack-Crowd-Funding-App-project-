
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import projectImage from '/src/assets/2.jpeg';
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMoneyBillWave,  faFire,faClock } from "@fortawesome/free-solid-svg-icons";
// css style 
import styles from '../project-List/ProjectList.module.css'
// dicoverd section 
import DiscoverHeader from "../../components/discoverHeader";



const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]); 
    const [error, setError] = useState(null);
  
  // const [searchDate, setSearchDate] = useState("");

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/projects/") 
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log("data is : ", data);
  //       setProjects(data.users); 
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching projects:", error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects/")
      .then(response => {
        setProjects(response.data);   // Store projects in state
        setFilteredProjects(response.data); 
          
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);  // Runs once when component mounts


  // search
  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSearchDate(value);

  //   if (value === "") {
  //     setFilteredProjects(projects); 
  //   } else {
  //     const filtered = projects.filter((project) =>
  //       project.start_date.startwith(value)
  //     );
  //     setFilteredProjects(filtered);
  //   }
  // };  

  // const handleReset = () => {
  //   setSearchDate("");
  //   setFilteredProjects(projects);
  // };

  return (
    <div className={`container ${styles.container}`}>
      <DiscoverHeader  projects={projects} 
  setFilteredProjects={setFilteredProjects}/>
      {loading ? (
        // <p className="text-center">Loading...</p>
        <div className={styles.loading}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading projects...</p>
        </div>
      ):error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ): (
        <div className={styles.projectsGrid}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((projects) => (
              <div key={projects.id} className={styles.projectCard}>
                
                <div className={styles.projectImageContainer}>
                <img
                    // src={`/assets/${projects.image}`} 
                    // alt={projects.title}
                    src={projectImage}
                    alt={projects.title}
                    className={styles.projectImage}
                  />

                    <span className={styles.projectBadge}>
                                      <FontAwesomeIcon icon={faFire} className="me-1" /> Trending
                                    </span>
                                    </div>

                <div className={styles.cardBody}>
                    <h5 className={styles.projectTitle}>
                      {projects.title}
                    </h5>
                    
                    <p className={styles.projectTarget}>
                      <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
                      Target: ${projects.total_target}
                    </p>
                    
                    <p className={styles.projectMeta}>
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                      Start: {projects.start_date}
                    </p>
                    
                    <p className={styles.projectMeta}>
                      <FontAwesomeIcon icon={faClock} className="me-2" />
                      End: {projects.end_date}
                    </p>
                  
                    
                    <div className={styles.actionButtons}>
                      <Link 
                       to={`/projects/${projects.id}`}
                        className={styles.btnDetails} 
                      >
                        Details
                      </Link>
                      <Link 
                        to={`/project/${projects.id}/edit`} 
                        className={styles.btnUpdate}
                      >
                        Update
                      </Link>
                      <Link 
                        to={`/project/${projects.id}/delete`} 
                        className={styles.btnDelete}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
            ))
          ) : (
            <p className={styles.noProjects}>No Project Founded </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;







