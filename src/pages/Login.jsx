import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
          const response = await axios.post('https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/login', {
            email,
            password,
          });
    
          console.log(response.data); // Log response from backend

          // Check if token exists in response
            if (response.data && response.data.token) {
                // Store token in localStorage (or session storage)
                localStorage.setItem("token", response.data.token);

                // Navigate to main page ("/main")
                navigate("/main");
            } else {
                console.error("Token not received in response");
                // Handle error (e.g., display error message to user)
                setLoginError(true);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setLoginError(true);
            // Handle specific error responses from backend
            if (error.response) {
              console.error("Server responded with error:", error.response.data);
              // Handle specific error messages from server
            } else {
              console.error("Network error occurred:", error.message);
              // Handle network-related errors (e.g., server unreachable)
            }
        }
      };

    return(
        <div className="login-page">
            <div className="card">
                <h1>Log In</h1>
                <div className="form">
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {loginError && <div className="error-message">Email or password incorrect</div>}
                </div>
                <div className="button" onClick={handleLogin}>Login</div>
                <p>No account? <Link to="/register"><span>Sign up</span></Link></p>
            </div>
        </div>
    )
}