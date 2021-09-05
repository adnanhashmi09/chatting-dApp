import React, { useEffect, useState } from 'react';
import GUN, { SEA } from 'gun';
import { user } from '../auth/userAuth';
import ChatMsg from './ChatMsg';
import { useSelector } from 'react-redux';
// import 'gun/lib/radix';
// import 'gun/lib/radisk';
// import 'gun/lib/store';
// import 'gun/lib/rindexed';

function Chat() {
  const db = GUN();

  const [newMessage, setnewMessage] = useState('');
  const [messages, setmessages] = useState([]);

  const username = useSelector((state) => state.user.value.username);
  useEffect(() => {
    console.log(db.get('chat'));

    db.get('chat').on((data, id) => {
      console.log(data);
    });

    db.get('chat')
      .map()
      .on(async (data, id) => {
        if (data) {
          const key = '#kewk';
          const message = {
            who: await db.user(data).get('alias'),
            what: data.what,
            when: GUN.state.is(data, 'what'),
          };
          console.log(message);
          setmessages((old) =>
            [...old.slice(-100), message].sort((a, b) => a.when - b.when)
          );
        }
      });
  }, []);

  // useEffect(() => {
  //   const array = Array(20).fill({
  //     who: 'someone',
  //     what: 'uuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, ',
  //     when: new Date(),
  //   });

  //   const array2 = Array(20).fill({
  //     who: 'you',
  //     what: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  //     when: new Date(),
  //   });
  //   let newArray = [
  //     ...array,
  //     ...array2,
  //     {
  //       who: 'mehul123',
  //       what: 'quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis',
  //       when: new Date(),
  //     },
  //   ];

  //   for (let i = newArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  //   }

  //   setmessages(newArray);
  // }, []);

  const sendMsg = async () => {
    //const msgEnc = await SEA.encrypt(newMessage, '#kewk');
    const message = user.get('all-msg').set({ what: newMessage });
    const index = new Date().toISOString();
    db.get('chat').get(index).put(message);
    setnewMessage('');
  };
  return (
    <div className="chatbox">
      <div className="all-chats">
        {messages.map((message, index) => {
          return <ChatMsg message={message} sender={username} key={index} />;
        })}
      </div>
      <div className="message-input-cont">
        <input
          type="text"
          name="new-message"
          placeholder="Enter message"
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
          required
        />
        <button onClick={sendMsg}>🎇</button>
      </div>
    </div>
  );
}

export default Chat;
