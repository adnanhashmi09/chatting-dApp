import React from 'react';

function ChatMsg({ message, sender }) {
  const messageClass = message.who === sender ? 'sent' : 'received';

  const avatar = `https://avatars.dicebear.com/api/micah/${message.who}.svg`;
  const time = new Date(message.when);
  return (
    <div className={`message ${messageClass}`}>
      <img className="avatar" src={avatar} alt="avatar" />
      <div className="text-msg">
        <p>{message.what}</p>
        <time>{time.toLocaleTimeString()}</time>
      </div>
    </div>
  );
}

export default ChatMsg;
