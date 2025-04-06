import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", formData);
            localStorage.setItem("token", response.data.access);
            alert("Login successful! Redirecting to Home...");
            navigate("/home");
        } catch (error) {
            setError("Invalid username or password!");
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <div className={styles.left}>
                    <h2>Welcome back!</h2>
                    <p>You can sign in to access with your existing account.</p>
                </div>
                <div className={styles.right}>
                    <h3>Sign In</h3>
                    {error && <div className={styles.errorMsg}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username or email"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <div className={styles.formOptions}>
                            {/* <label>
                                <input type="checkbox" /> Remember me
                            </label> */}
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                        <button type="submit" className={styles.signInButton}>Sign In</button>
                    </form>
                    <p className={styles.createAccount}>
                        New here? <a href="/register">Create an Account!</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
