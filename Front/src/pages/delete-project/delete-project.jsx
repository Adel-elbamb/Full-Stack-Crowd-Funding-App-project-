import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./DeleteProject.module.css";

const DeleteProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      alert(`Project ${id} has been deleted successfully`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.deleteProjectContainer}>
      <div className={styles.deleteProjectCard}>
        <h2>Delete Project</h2>
        <p>Are you sure you want to delete this project?</p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button className={styles.cancelBtn} onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProject;
