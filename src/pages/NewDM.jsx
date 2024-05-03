import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function NewDM(){
    const [recipientEmail, setRecipientEmail] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const { userId } = useParams();

    const handleSendMessage = async () => {
        try {
          const response = await axios.post(
            `https://frozen-dusk-10243-6bbfc1b3a39e.herokuapp.com/api/direct_messages/${userId}/new_message`,
            {
              messageRecipient: recipientEmail,
              directMessage: messageContent,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          
          console.log(response.data); // Log response from backend
    
          // Display success message to user (e.g., alert)
          alert('Message sent successfully!');
    
          // Clear input fields after sending message
          setRecipientEmail('');
          setMessageContent('');
        } catch (error) {
          console.error('Error sending message:', error);
          // Display error message to user (e.g., alert)
          alert('Error sending message. Please try again.');
        }
      };
    
    return(
        <div className="new-message-form">
            <input
                type="text"
                placeholder="Recipient Email"
                className="to"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <textarea
                placeholder="Type message here"
                className="message"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="button" onClick={handleSendMessage}>
                Send
            </div>
        </div>
    )
}