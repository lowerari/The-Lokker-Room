import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ViewMessages(){
    const { userId } = useParams();
    const token = localStorage.getItem('token');
    const [messages, setMessages] = useState([]);
    const [recipientId, setRecipientId] = useState(null);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        const fetchDirectMessageData = async () => {
            try{
                const response = await axios.get(`https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/direct_messages/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data);

                setMessages(response.data);

                const firstMessage = response.data[0]; // Get the first message in the response

                // Determine the recipientId based on the first message
                if (firstMessage && firstMessage.recipient_id == userId) {
                    setRecipientId(firstMessage.sender_id); // Set recipientId to sender_id
                } else {
                    setRecipientId(firstMessage.recipient_id); // Set recipientId to recipient_id
                }
                
            }catch(error){
                console.error('Error:', error);
            }
        }

        fetchDirectMessageData();
    }, [token, userId])

    const handleSendMessage = async () => {
        try {
          const response = await axios.post(
            `https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/direct_messages/${userId}/new_message`,
            {
              messageRecipient: recipientId,
              directMessage: messageContent,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
    
          console.log(response.data); // Log response from backend
    
          // Clear input fields after sending message
          setMessageContent('');
        } catch (error) {
          console.error('Error sending message:', error);
          // Display error message to user (e.g., alert)
          alert('Error sending message. Please try again.');
        }
      };


    return(
        <div className="messages-container">
            <div className="messages">
                {messages && messages.map(message => (
                    <div className={message.sender_id == userId ? 'sent-message' : 'received-message'} key={message.id}>
                        <div className="sender-name">{message.sender_nickname}</div>
                        {message.message_content}
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