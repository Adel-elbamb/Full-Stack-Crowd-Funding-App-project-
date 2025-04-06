import React from "react";
import aboutImg1 from "../../assets/about/a1.jfif"; 
import callToActionImg from "../../assets/about/a3.jfif";  
import "./About.css";


const About = () => {
  return (
    <div className="container mt-5" id="about">
      <div className="row align-items-center pb-5">
        <div className="col-xl-6 col-md-6">
          <div className="left-about ">
            <h3>Our Mission</h3>
            <p>
            We are dedicated to providing support and resources to the people of Palestine. Our mission is to raise awareness, offer aid, and empower communities through meaningful contributions. Every donation helps to make a significant impact on the lives of those in need.
            </p>
            <button className="btn rounded-4 px-3">Read More</button>
          </div>
        </div>
        <div className="col-xl-6 col-md-6 text-center">
          <div className="right-about ">
            <img src={aboutImg1} alt="" className="w-75 h-100 about-1" />
            {/* <img src={aboutImg2} alt="" className="h-50 about-2" /> */}
            {/* <img src={aboutImg3} alt="" className="h-50 about-3" /> */}
          </div>
        </div>
      </div>
      <div className="row mt-5 become">
        <div className="col-xl-6 col-md-6 ps-0">
          <img className="w-100 h-75 become-left " src={callToActionImg} alt="" />
        </div>
        <div className="col-xl-6 col-md-6 become-right wow animate__pulse">
          <h3>How You Can Help</h3>
          <p>
          Your generosity can create lasting change. By contributing to our cause, you are helping provide essential resources, education, and relief for Palestinian families. Together, we can work towards a brighter future for the people of Palestine.
          </p>
          <button className="btn w-100 py-3">
            Get Started Now <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
