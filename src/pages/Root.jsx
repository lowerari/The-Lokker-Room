import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Root(){
    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem('token');

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


    return(
        <div className="root">
            <nav>
                <p>The Lokker Room</p>
                <div className="links">
                    <NavLink to="/main/create_lobby">
                        <div className="create-lobby">Create a Lobby</div>
                    </NavLink>
                    <NavLink to="/main/view_lobbies">
                        <div className="view-lobbies">View Lobbies</div>
                    </NavLink>
                    <NavLink to={`/main/direct_messages/${userId}`}>
                        <div className="direct-messages">View DMs</div>
                    </NavLink>
                    <NavLink to={`/`}>
                        <div className="log-out">Log Out</div>
                    </NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}