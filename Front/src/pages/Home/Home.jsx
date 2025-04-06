import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BackgroundSlider from './BackgroundSlider';  // Import the BackgroundSlider component
import About from './../about/about'; // Assuming About component is already created
import Projects from './../Projects';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`mt-2.5 ${styles.homeContainer}`}>
      {/* BackgroundSlider as a background */}
      <BackgroundSlider />
      
   

      {/* About Section */}
      <div className={`  container mb-5 ${styles.aboutSection}`}>
        <h2 className={styles.aboutTitle}>About Us</h2>
        <About />
      </div>

      {/* Add other sections as needed */}
    </div>
  );
}

export default Home;
