import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// images 
// import img1 from '/src/assets/1.jpeg';
// import img2 from '/src/assets/2.jpeg';
// import img3 from '/src/assets/3.jpeg';
// import img4 from '/src/assets/4.jpeg';

import { useNavigate } from "react-router-dom";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faHandHoldingUsd,faEye,faMoneyBillWave,  faFire,faClock,faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// css style 
import styles from '../project-List/ProjectList.module.css'
// dicoverd section 
import DiscoverHeader from "../../components/discovered/discoverHeader";

const images = [
  "https://www.emiratesrc.ae/ghaith/img/Qalby%20Etmaan/Seasons/4/thumbnail.png",
  "https://gopalestine.ps/wp-content/uploads/2022/12/Volunteer-Programs-in-Palestine.png",
  "https://www.emiratesrc.ae/ghaith/img/Qalby%20Etmaan/Seasons/6/thumbnail.png",
 "https://static.vecteezy.com/system/resources/previews/034/488/058/non_2x/illustration-about-save-palestine-t-shirt-design-with-black-background-vector.jpg"

 ];

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();


    const handleDonate = (projectId) => {
      const confirmDonate = window.confirm("Are you Know need to Donate ");
    
      if (confirmDonate) {
        navigate(`/project/${projectId}/Thank`);
      } else {
        alert("Donate canceled Done");
      }
    };
  
  
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
  // const images = [img1, img2, img3, img4];
 

  return (
    <div className={`container md-4 ${styles.container}`}>
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
            filteredProjects.map((projects) =>{
              const getRandomImage = () => {
                try {
                  const imgIndex = Math.floor(Math.random() * images.length);
                  return images[imgIndex];
                } catch (error) {
                  console.error("Error loading image:", error);
                  return ""; 
                }
              };
              return (
<div key={projects.id} className={styles.projectCard}>
                
                <div className={styles.projectImageContainer}>
                <img
  src={getRandomImage()}
  alt={projects.title}
  className={styles.projectImage}
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = "";
  }}
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
                    <button
  onClick={() => handleDonate(projects.id)}
  className={styles.iconCircle}
  title="Donate"
>
  <FontAwesomeIcon icon={faHandHoldingUsd} />
</button>
                      <Link 
                       to={`/projects/${projects.id}`}
                        className={styles.iconCircle} 
                      >
                         <FontAwesomeIcon icon={faEye} />
                      </Link>
                      <Link 
                        to={`/project/${projects.id}/edit`} 
                        className={styles.iconCircle}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <Link 
                        to={`/project/delete/${projects.id}`} 
                        className={styles.iconCircle}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Link>


                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className={styles.noProjects}>No Project Founded </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;







