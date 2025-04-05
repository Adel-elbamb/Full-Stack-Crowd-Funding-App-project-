import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave,faTrashAlt,faEdit,faCalendarAlt,faClock,faArrowLeft} from "@fortawesome/free-solid-svg-icons";


import styles from '../Project-Details/ProjectDetails.module.css';

const images = [
  "https://www.emiratesrc.ae/ghaith/img/Qalby%20Etmaan/Seasons/4/thumbnail.png",
  "https://gopalestine.ps/wp-content/uploads/2022/12/Volunteer-Programs-in-Palestine.png",
  "https://www.emiratesrc.ae/ghaith/img/Qalby%20Etmaan/Seasons/6/thumbnail.png",
 "https://static.vecteezy.com/system/resources/previews/034/488/058/non_2x/illustration-about-save-palestine-t-shirt-design-with-black-background-vector.jpg"

 ];

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState("");


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projects/${id}/`);
        setProject(response.data);
        const imageIndex = response.data.id % images.length;
        setCurrentImage(images[imageIndex]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <Link to="/project" className={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>Project not found</p>
        <Link to="/project" className={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <Link to="/project" className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Projects
      </Link>

      <div className={styles.projectHeader}>
        <h1 className={styles.projectTitle}>{project.title}</h1>
        <div className={styles.projectImageContainer}>
          <img
            src={currentImage}
            alt={project.title}
            className={styles.projectImage}
          />
        </div>
      </div>

      <div className={styles.projectDetails}>
        <div className={styles.detailSection}>
          <h2>About the Project</h2>
          <p className={styles.projectDescription}>{project.details}</p>
          <div className={styles.actionButtons}>
         <Link 
                                to={`/project/${project.id}/edit`} 
                                className={styles.iconCircle}
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                              <Link 
                                to={`/project/delete/${project.id}`} 
                                className={styles.iconCircle}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </Link>
        </div>
        </div>

        <div className={styles.metaSection}>
          <div className={styles.metaItem}>
            <FontAwesomeIcon icon={faMoneyBillWave} className={styles.metaIcon} />
            <span>Target: ${project.total_target?.toLocaleString()}</span>
          </div>

          <div className={styles.metaItem}>
            <FontAwesomeIcon icon={faCalendarAlt} className={styles.metaIcon} />
            <span>Start Date: {new Date(project.start_date).toLocaleDateString()}</span>
          </div>

          <div className={styles.metaItem}>
            <FontAwesomeIcon icon={faClock} className={styles.metaIcon} />
            <span>End Date: {new Date(project.end_date).toLocaleDateString()}</span>
          </div>

         
        </div>

      
      </div>
    </div>
  );
};

export default ProjectDetails;