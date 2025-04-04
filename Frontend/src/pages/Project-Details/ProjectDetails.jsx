import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave,faCalendarAlt,faClock,faMapMarkerAlt,faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import styles from '../Project-Details/ProjectDetails.module.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projects/${id}/`);
        setProject(response.data);
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
        {/* <div className={styles.projectImageContainer}>
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectImage}
          />
        </div> */}
      </div>

      <div className={styles.projectDetails}>
        <div className={styles.detailSection}>
          <h2>About the Project</h2>
          <p className={styles.projectDescription}>{project.details}</p>
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

          {project.location && (
            <div className={styles.metaItem}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.metaIcon} />
              <span>Location: {project.location}</span>
            </div>
          )}
        </div>

        <div className={styles.actionButtons}>
          <Link to={`/projects/${project.id}/edit`} className={styles.editButton}>
            Edit Project
          </Link>
          <Link to={`/projects/${project.id}/delete`} className={styles.deleteButton}>
            Delete Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;