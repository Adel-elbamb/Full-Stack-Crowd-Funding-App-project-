import React, { useState, useEffect } from 'react';
import styles from './BackgroundSlider.module.css';  // Import the CSS module
import image1 from './../../assets/Home/20.jpg';  // Correct image path
import image2 from './../../assets/Home/22.jpg';  // Correct image path
import image3 from './../../assets/Home/23.jpg';  // Correct image path

const BackgroundSlider = () => {
  // Array of images to be displayed as the background
  const images = [
    `url(${image1})`,  // Image paths for the slider
    `url(${image2})`,
    `url(${image3})`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);  // Cleanup on component unmount
  }, []);

  return (
    <div
      className={styles.backgroundSlider}
      style={{ backgroundImage: images[currentIndex] }}
    >
      {/* You can add additional content or components here */}
      <div className={styles.content}>
        <h1 className={styles.homeTitle}>Welcome to CrowdFunding</h1>
        <p className={styles.homeSubtitle}>Empowering ideas through community support</p>
      </div>

      {/* Dots for slider navigation */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundSlider;
