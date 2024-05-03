import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function DirectMessages(){
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchDirectMessageData = async () => {
            try{
                const response = await axios.get(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/direct_messages/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data);
                let initialData = response.data
                let rearangedData = []
                response.data.forEach((dmFirstPass) => {
                    let newconversation = []
                    newconversation.push(dmFirstPass)
                    initialData.shift()
                    console.log("checking")
                    console.log(dmFirstPass)
                    initialData.forEach((dmSecondPass) => {
                        console.log("checking against")
                        console.log(dmSecondPass)
                        if(dmFirstPass.sender_id === dmSecondPass.sender_id && dmFirstPass.recipient_id === dmSecondPass.recipient_id){
                            newconversation.push(dmSecondPass)
                            
                            var index = initialData.indexOf(dmSecondPass);
                            if (index !== -1) {
                                initialData.splice(index, 1);
                            }
                        }
                    })
                    console.log("conversation", newconversation)
                    rearangedData.push(newconversation)
                })
                console.log("heyyyyy")
                console.log(rearangedData)

                
                setMessages(response.data);
            }catch(error){
                console.error('Error:', error);
            }
        }

        fetchDirectMessageData();
    }, [token, userId]) 


    // Function to truncate message content to a maximum of 10 words
    const truncateMessage = (content, maxLength) => {
        const words = content.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        } else {
            return content;
        }
    };

    return(
        <div className="direct-messages-page">
            <h1>Direct Messages</h1>
            {messages && messages.map(message => (
                <div className="message-card" key={message.id}>
                    <p className="name">Sender:{message.sender_nickname}</p>
                    <p className="message-preview">{truncateMessage(message.message_content, 10)}</p>
                    <Link to={`/main/direct_messages/${userId}/view_messages`}>
                        <div className="button">View</div>
                    </Link>
                </div>
            ))}
            
            <div className="new-message">
                <Link to={`/main/direct_messages/${userId}/new_message`}>
                        <div className="button">New Message+</div>
                </Link>
            </div>
        </div>
    )
}