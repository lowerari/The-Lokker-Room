import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function CreateLobby(){
    const [lobbyName, setLobbyName] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleCreateLobby = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Display alert and redirect to "/"
            alert("Please log back in.");
            navigate("/");
            return;
        }

        try{
            const response = await axios.post('https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies', 
                { name: lobbyName },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            )

            console.log(response.data);
            
            // Display success alert upon lobby creation
            alert("Lobby successfully created!");

            // Clear input field after successful creation
            setLobbyName("");
            setError(false);
        }catch(error){
            console.error('Error:', error);
            setError(true);
        }
    }

    return(
        <div className="create-lobby-page">
                <h1>Create a New Lobby:</h1>
                <input 
                    type="text" 
                    placeholder="Lobby Name"
                    value={lobbyName}
                    onChange={(e) => setLobbyName(e.target.value)} 
                />
                {error && <div className="error-message">Please enter a lobby name</div>}
                <div className="button" onClick={handleCreateLobby}>Create</div>
        </div>
    )
}