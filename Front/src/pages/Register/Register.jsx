import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        password2: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");  // Clear previous errors

        try {
            await axios.post("http://127.0.0.1:8000/api/register/", formData);
            alert("Registration successful! Redirecting to login...");
            navigate("/login");  //
        } catch (error) {
            setError(error.response?.data || "Registration failed!");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-3">Register</h2>
                
                {error && <div className="alert alert-danger">{JSON.stringify(error)}</div>}
                
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-2" name="first_name" placeholder="First Name" onChange={handleChange} required />
                    <input type="text" className="form-control mb-2" name="last_name" placeholder="Last Name" onChange={handleChange} required />
                    <input type="email" className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="text" className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="password" className="form-control mb-2" name="password" placeholder="Password" onChange={handleChange} required />
                    <input type="password" className="form-control mb-3" name="password2" placeholder="Confirm Password" onChange={handleChange} required />
                    
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>

                <p className="text-center mt-3">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
