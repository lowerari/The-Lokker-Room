import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function Register(){
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [team, setTeam] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({}); 
    const navigate = useNavigate(); // Access history object for navigation

    const handleSignUp = async () => {
        try {
            // Validate form inputs
            if (!email) {
                setErrors({ email: "Please enter an email" });
                return;
            }
            if (!nickname) {
                setErrors({ nickname: "Please enter a nickname" });
                return;
            }
            if (!team) {
                setErrors({ team: "Please enter a team name" });
                return;
            }
            if (!password) {
                setErrors({ password: "Please enter a password" });
                return;
            }
            if (password !== confirmPassword) {
                setErrors({ confirmPassword: "Passwords do not match" });
                return;
            }

            // Clear any existing errors
            setErrors({});


          const response = await axios.post('https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/register', {
            email,
            nickname,
            team,
            password,
          });
    
          console.log(response.data); // Log response from backend
    
          //redirect to home page
          navigate("/");
        } catch (error) {
          console.error("Error signing up:", error);
          // Handle error (e.g., display error message to user)
        }
      };

    return(
        <div className="sign-up-page">
            <div className="card">
                <h1>Sign Up</h1>
                <div className="form">
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                    <input 
                        type="text" 
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)} 
                    />
                    {errors.nickname && <div className="error-message">{errors.nickname}</div>}
                    <input 
                        type="text" 
                        placeholder="Team Name"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)} 
                    />
                    {errors.team && <div className="error-message">{errors.team}</div>}
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    <input 
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
                <div className="button" onClick={handleSignUp}>Sign Up</div>
                <p>Have an account? <Link to="/login"><span>Log in</span></Link></p>
            </div>
        </div>
    )
}