import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Lobby(){
    //add edit functionality

    const token = localStorage.getItem('token');
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const { lobbyid } = useParams();
    const [userId, setUserId] = useState(null);
    const [lobbies, setLobbies] = useState([]);
    const [lobbyName, setLobbyName] = useState('');

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
        const fetchMessageData = async () => {
            try{
                const response = await axios.get(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/${lobbyid}/messages`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data)

                setMessages(response.data); // Update messages state with fetched data
            }catch(error){
                console.error('Error:', error);
            }
        }
        fetchMessageData();
    }, [lobbyid, token]);

    const handleSendMessage = async () => {
        try{
            const response = await axios.post(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/${lobbyid}/new_message`, 
                { message: messageContent },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            )
            console.log(response.data)

            alert('Message sent, refresh to see changes!');

            setMessageContent('');
        }catch(error){
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const selectedLobby = lobbies.find(lobby => lobby.id === parseInt(lobbyid));
        if (selectedLobby) {
            setLobbyName(selectedLobby.name);
        }
    }, [lobbies, lobbyid]);

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/${lobbyid}/messages/${messageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // After deletion, update the messages state to reflect the updated list
            const updatedMessages = messages.filter(message => message.id !== messageId);
            setMessages(updatedMessages);
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Only admin can delete messages!')
        }
    };

    const handleEditMessage = async (messageId) => {
        try {
            const newContent = prompt('Enter new message content:');
            if (newContent) {
                await axios.put(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/lobbies/${lobbyid}/messages/${messageId}`, 
                    { newContent },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                // After editing, update the messages state to reflect the updated list
                const updatedMessages = messages.map(message => {
                    if (message.id === messageId) {
                        return { ...message, content: newContent };
                    }
                    return message;
                });
                setMessages(updatedMessages);
            }
        } catch (error) {
            console.error('Error editing message:', error);
            alert('You can only edit your own messages!');
        }
    };


    return(
        <div className="lobby">
            <div className="top-bar">
                <div className="lobby-name">{lobbyName}</div>
                <div className="addUserButton">
                    <Link to={`/main/view_lobbies/${ lobbyid }/add_user`}> {/*I'm not sure if it was the first / or defactorizing the id that fixed it but it's fixed */}
                        <div className="add-new">Add User+</div>
                    </Link>
                </div>
            </div>
            <div className="messages">
                {messages && messages.map(message => (
                    <div className={message.sender_id === userId ? 'sent-message' : 'received-message'} key={message.id}>
                        <div className="sender-name">{message.sender_nickname}</div>
                        <div className="message">{message.content}</div>
                        <div className="icons">
                            <div className="edit" onClick={() => handleEditMessage(message.id)}>
                                <img src="/src/pictures/icons8-edit-24.png" alt="" />
                            </div>
                            <div className="delete" onClick={() => handleDeleteMessage(message.id)}>
                                <img src="/src/pictures/icons8-delete-24.png" alt="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="message-box">
                <input 
                    type="text" 
                    placeholder="Type message here"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}  
                />
                <div className="button" onClick={handleSendMessage}>Send</div>
            </div>
        </div>
    )
}