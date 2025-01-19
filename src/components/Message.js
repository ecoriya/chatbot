import React from 'react';

const Message = ({ message }) => {
    console.log(message); // Log the message to see if it's correct
    return (
        <div className={`message ${message.user_message ? 'user' : 'bot'}`}>
            <p>{message.user_message || message.bot_response}</p>
        </div>
    );
};

export default Message;
