import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ViewLobbies(){
    const token = localStorage.getItem('token');
    const [lobbies, setLobbies] = useState([]);
    const [userId, setUserId] = useState(null); // Current user's ID

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await axios.get('https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/user',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                console.log(response.data)

                const user = response.data[0];
                const id = user.id;

                setUserId(id)
            }catch(error){
                console.error('Error:', error);
            }
        }

        fetchUserData();
    }, [token]);

    useEffect(() => {
        const fetchLobbyData = async () => {
            try{
                const response = await axios.get('https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                console.log(response.data)

                setLobbies(response.data)
            }catch(error){
                console.error('Error:', error);
            }
        }

        fetchLobbyData();
    }, [token]);

    return(
        <div className="view-lobbies-page">
            <h1>Your Lobbies:</h1>
            {lobbies && lobbies.map(lobby => (
                <Link to={`/main/view_lobbies/${lobby.id}`} key={lobby.id}>
                    <div className="lobby">
                        <p className="lobby-name">{lobby.name}</p>
                        <div className="divider"></div>
                        <p className="lobby-team">Team: {lobby.team}</p>
                        <div className="divider"></div>
                        <p className="admin">Admin? <span className={lobby.user_id === userId ? 'isAdmin' : 'isNotAdmin'}>{lobby.user_id === userId ? 'Yes' : 'No'}</span></p>
                    </div>
                </Link>
            ))}
        </div>
    )
}