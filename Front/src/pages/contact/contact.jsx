import React from "react";
import "./contact.css";
import phone from "../../assets/contact/top-view-blue-monday-concept-composition-with-telephone.jpg";

const ContactForm = () => {
  return (
    <div className="contact-container d-flex justify-content-center align-items-center">
      <div className="contact-card shadow">
        <div className="row g-0">
          <div className="col-md-5 d-none d-md-block">
            <img
              src={phone}
              alt="plant"
              className="phone "
            />
          </div>
          <div className="col-md-7 p-4">
            <h2 className="text-uppercase fw-bold mb-4">Contact</h2>
            <form>
              <div className="row mb-3">
                <div className="col">
                  <input type="text" className="form-control" placeholder="First Name" />
                </div>
                <div className="col">
                  <input type="text" className="form-control" placeholder="Last Name" />
                </div>
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="E-mail" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="3" placeholder="Message"></textarea>
              </div>
              <button type="submit" className="btn send-btn w-100">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
