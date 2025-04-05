import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");  // ✅ Remove JWT token
        navigate("/login");  // ✅ Redirect to Login
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>Welcome to the Home Page!</h1>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
