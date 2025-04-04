import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSyncAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/discoverHeader.module.css";

const DiscoverHeader = ({ projects, setFilteredProjects }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("trending");

  // cahange date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      setFilteredProjects([]);
      return;
    }

    const filtered = projects.filter((project) => {
      const projectStart = new Date(project.start_date);
      const projectEnd = new Date(project.end_date);
      const filterStart = new Date(startDate);
      const filterEnd = new Date(endDate);
      
      return projectStart <= filterEnd && projectEnd >= filterStart;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "trending") {
        return b.total_target - a.total_target;
      } else if (sortBy === "newest") {
        return new Date(b.start_date) - new Date(a.start_date);
      }
      return 0;
    });

    setFilteredProjects(sorted);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setFilteredProjects(projects);
  };

  return (

    <div className={styles.headerContainer}>
      <h1 className={styles.discoverTitle}>Discover</h1>
      <p className={styles.discoverSubtitle}>Find causes you truly care about</p>
      
      <div className={styles.filterControls}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Sorted by:</span>
          <select 
            className={styles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

{/*Search Date  */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.dateInputGroup}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <input
              type="date"
              className={styles.searchInput}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate }
            />
          </div>
          
          <div className={styles.dateInputGroup}>
            <FontAwesomeIcon icon={faCalendarAlt} />
            <input
              type="date"
              className={styles.searchInput}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate }
            />
          </div>
          
          <button 
            className={styles.btnSearch}
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
          
          <button 
            className={styles.btnReset}
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faSyncAlt} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverHeader;