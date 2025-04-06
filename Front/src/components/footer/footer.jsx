import React from 'react';
import './Footer.css';

import logo from '../../assets/footer/logo2.jfif';
import social1 from '../../assets/footer/download (1).webp';
import social2 from '../../assets/footer/download (2).webp';
import social3 from '../../assets/footer/download (3).webp';
import social4 from '../../assets/footer/download (4).webp';
import social5 from '../../assets/footer/download.webp';

const Footer = () => {
  return (
    <footer>
      <section className="footer-content">
        <img src={logo} alt="Logo" className='footer-logo'/>
        
        <ul className="menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">Donations</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">About us</a></li>
        </ul>

        <ul className="social">
          <li><a href="#"><img src={social1} alt="Social 1" /></a></li>
          <li><a href="#"><img src={social2} alt="Social 2" /></a></li>
          <li><a href="#"><img src={social3} alt="Social 3" /></a></li>
          <li><a href="#"><img src={social4} alt="Social 4" /></a></li>
          <li><a href="#"><img src={social5} alt="Social 5" /></a></li>
        </ul>

        <p className="text-white-50">Copyright © 2025.</p>
        <p className="text-white-50">Powered by Our Talented Team</p>
      </section>
    </footer>
  );
};

export default Footer;
