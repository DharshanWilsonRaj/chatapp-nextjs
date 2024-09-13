// "use client"
// import styles from "./page.module.css";
// import { useState, useEffect } from 'react'
// let socket;

// export default function Home() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     socket = new WebSocket('ws://localhost:8080');

//     socket.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };

//     socket.onopen = () => {
//       console.log('Connected to the WebSocket server');
//     };

//     socket.onclose = () => {
//       console.log('Disconnected from the WebSocket server');
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     socket.send(input);
//     setInput('');
//   };

//   return (
//     <div>
//       <h1>Chat</h1>
//       <div>
//         {messages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// }


// Broadcasting messages

// "use client";
// import Sidebar from "@/components/sidebar/sidebar";
// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import Header from "@/components/header/header";
// import ChatContainer from "@/components/ChatContainer/ChatContainer";

// let socket;

// export default function Home() {
//   const [chats, setChats] = useState([]);
//   const [input, setInput] = useState('');
//   const [receiver, setReceiver] = useState(null);
//   const [sender, setsender] = useState(null);


//   useEffect(() => {
//     socket = io('http://localhost:3500');
//     socket.on('message', ({ data }) => {
//       const { receiver_id, message, sender_id } = data;


//       // if (receiver_id === sender.id && receiver_id === receiver?.id) {
//         setChats((prevMessages) => [...prevMessages, {
//           sendByCurrentUser: sender?.id === sender_id ? true : false,
//           message: message,
//           receiver_id: receiver_id
//         }]);
//       // }

//     });

//     socket.on('connect', () => {
//       console.log('Connected to the Socket.IO server');
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from the Socket.IO server');
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [receiver?.id, sender?.id]);

//   const handleSendMessage = () => {
//     socket.emit('message', { receiver_id: receiver?.id, message: input, sender_id: sender.id });
//     setInput('');
//   };


//   useEffect(() => {
//     const user = { name: "Karan", id: 1, email: "karan@gmail.com", password: "123456" };
//     // const user = { name: "Ajith", id: 2, email: "Ajith@gmail.com", password: "123456" };
//     // const user = { name: "vevik", id: 3, email: "vevik@gmail.com", password: "123456" };
//     const userExist = JSON.parse(localStorage.getItem('logged_user'))
//     if (!userExist) {
//       localStorage.setItem("logged_user", JSON.stringify(user));
//     }
//     else {
//       setsender(userExist)
//     }
//   }, [])

//   return (
//     <div style={{ height: "100vh" }}>
//       <Header user={sender} />
//       <div style={{ display: "flex" }}>
//         <Sidebar setReceiver={setReceiver} />
//         <ChatContainer
//           setInput={setInput}
//           input={input}
//           handleSendMessage={handleSendMessage}
//           receiver={receiver}
//           chats={chats}
//         />
//       </div>
//     </div>
//   );
// }

// indivival mesages
"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Header from "@/components/header/header";
import ChatContainer from "@/components/ChatContainer/ChatContainer";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState('');
  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);
  const [socket, setSocket] = useState(null); 

  useEffect(() => {

    const socketInstance = io('http://localhost:3500');
    setSocket(socketInstance);

    if (sender) {
      socketInstance.emit('register', sender.id);
    }

    socketInstance.on('message', (data) => {
      const { receiver_id, message, sender_id } = data ;
      if (receiver_id && message && sender_id) {
        setChats(prevMessages => [...prevMessages, {
          sendByCurrentUser: sender?.id === sender_id,
          message,
          receiver_id
        }]);
      }
    });

    socketInstance.on('connect', () => {
      console.log('Connected to the Socket.IO server');
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from the Socket.IO server');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [sender, sender.id]);


  const handleSendMessage = () => {
    if (sender && receiver && socket) {
      socket.emit('message', {
        receiver_id: receiver.id,
        message: input,
        sender_id: sender.id
      });
      setInput('');
    }
  };
    useEffect(() => {
      const user = { name: "Ajith", id: 2, email: "Ajith@gmail.com", password: "123456" };
    // const user = { name: "Karan", id: 1, email: "karan@gmail.com", password: "123456" };
    // const user = { name: "vevik", id: 3, email: "vevik@gmail.com", password: "123456" };
    const userExist = JSON.parse(localStorage.getItem('logged_user'))
    if (!userExist) {
      localStorage.setItem("logged_user", JSON.stringify(user));
    }
    else {
      setSender(userExist)
    }
  }, [])

  return (
    <div style={{ height: "100vh" }}>
      <Header user={sender} />
      <div style={{ display: "flex" }}>
        <Sidebar setReceiver={setReceiver} />
        <ChatContainer
          setInput={setInput}
          input={input}
          handleSendMessage={handleSendMessage}
          receiver={receiver}
          chats={chats}
        />
      </div>
    </div>
  );
}
