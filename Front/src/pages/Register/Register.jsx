import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css"; 

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    const { first_name, last_name, email, username, password, password2 } = formData;

    if (!first_name) errors.first_name = "First Name is required";
    if (!last_name) errors.last_name = "Last Name is required";
    if (!email) errors.email = "Email is required";
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!password2) errors.password2 = "Confirm Password is required";

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email && !emailPattern.test(email)) errors.email = "Enter a valid email address";

    if (password !== password2) errors.password2 = "Passwords do not match";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", formData);
      alert("Registration successful! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Registration failed!");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start your journey with us.</p>
        </div>
        <div className={styles.right}>
          <h3>Create Account</h3>

          {error && <div className={styles.errorMsg}>{JSON.stringify(error)}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.first_name}
              className={`${styles.input} ${formErrors.first_name ? styles.invalid : ""}`}
            />
            {formErrors.first_name && <div className={styles.errorMsg}>{formErrors.first_name}</div>}

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
              className={`${styles.input} ${formErrors.last_name ? styles.invalid : ""}`}
            />
            {formErrors.last_name && <div className={styles.errorMsg}>{formErrors.last_name}</div>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className={`${styles.input} ${formErrors.email ? styles.invalid : ""}`}
            />
            {formErrors.email && <div className={styles.errorMsg}>{formErrors.email}</div>}

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              className={`${styles.input} ${formErrors.username ? styles.invalid : ""}`}
            />
            {formErrors.username && <div className={styles.errorMsg}>{formErrors.username}</div>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className={`${styles.input} ${formErrors.password ? styles.invalid : ""}`}
            />
            {formErrors.password && <div className={styles.errorMsg}>{formErrors.password}</div>}

            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formData.password2}
              className={`${styles.input} ${formErrors.password2 ? styles.invalid : ""}`}
            />
            {formErrors.password2 && <div className={styles.errorMsg}>{formErrors.password2}</div>}

            <button type="submit" className={styles.signInButton}>Register</button>
          </form>

          <p className={styles.createAccount}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
