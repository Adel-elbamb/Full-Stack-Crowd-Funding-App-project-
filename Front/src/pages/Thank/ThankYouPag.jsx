import React from 'react';
import { Link } from 'react-router-dom';
import styles from './thank.module.css'; 

const ThankYouPage = () => {
  return (
    <div className={styles.wrapper}>
  <div className={styles.container}>
      <h1>Thanks for Donate </h1>
      <p>
        Your Donate has been completed successfully. We will prepare your Donate and ship it as soon as possible.
      </p>
      <Link to="/" className={styles.btnBack}>GO Home</Link>
    </div>
    </div>
  
  );
};

export default ThankYouPage;