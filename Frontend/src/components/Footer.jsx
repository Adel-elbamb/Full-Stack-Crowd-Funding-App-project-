import React from 'react';
import style from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={`text-center p-3 bg-dark text-white ${style.footer}`}>
            © 2025 CrowdFunding. All rights reserved.
        </footer>
    );
};

export default Footer;