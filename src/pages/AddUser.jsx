import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddUser(){
    const token = localStorage.getItem('token');
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const { lobbyid } = useParams();

    const handleSignUp = async () => {
        try {
          const response = await axios.post(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/${lobbyid}/add_user`, {
            newUserEmail: email,
            newUserNickname: nickname,
            newUserPassword: password,
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
    
          console.log(response.data); // Log response from backend

          // Display success alert upon lobby creation
          alert(`New user ${nickname} successfully created!`);
        } catch (error) {
          console.error("Error signing up:", error);
          // Handle error (e.g., display error message to user)
        }
      };

    return(
        <div className="addUser">
            <h1>Add a New User</h1>
                <div className="form">
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="button" onClick={handleSignUp}>Add User</div>
        </div>
    )
}