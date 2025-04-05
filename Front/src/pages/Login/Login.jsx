import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-3">Login</h2>
                
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="password" className="form-control mb-3" name="password" placeholder="Password" onChange={handleChange} required />
                    
                    <button type="submit" className="btn btn-success w-100">Login</button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
