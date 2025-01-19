import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatInput from './ChatInput';
import Message from './Message';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);

    // // Fetch previous messages from the server
    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/chat/messages')
    //         .then((response) => {
    //             console.log(response.data); // Log the fetched messages
    //             setMessages(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching messages:', error);
    //         });
    // }, []); // Empty array ensures this runs only once when the component mounts
    useEffect(() => {
        const dummyMessages = [
            { id: 1, user_message: 'Hello!', bot_response: 'Hi, how can I help you?' },
            { id: 2, user_message: 'What is React?', bot_response: 'React is a JavaScript library for building user interfaces.' }
        ];
        setMessages(dummyMessages);
    }, []);
    
    

    // Handle sending a new message
    const sendMessage = (userMessage) => {
        axios.post('http://localhost:5000/api/chat/sendMessage', { user_message: userMessage })
            .then((response) => {
                setMessages((prevMessages) => [...prevMessages, response.data]);
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg) => (
                    <Message key={msg.id} message={msg} />
                ))}
            </div>
            <ChatInput onSendMessage={sendMessage} />
        </div>
    );
};

// Correct export statement
export default ChatWindow;
