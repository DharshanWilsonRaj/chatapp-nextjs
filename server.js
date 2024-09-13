// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     ws.send(`You sent: ${message}`);
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// import { createServer } from 'http';
// import { Server } from 'socket.io';

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*'
//   }
// })
// Boardcasting  for all user 
// io.on('connection', socket => {
//   console.log(`user ${socket.id}  connected`);
//   socket.on('message', data => {
//     io.emit('message', { type: 'message', data: data });
//   })
// })

// httpServer.listen(3500, () => console.log('Server listing port 3500'))






import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

const userSockets = {}; //tracker user

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Register user and map user ID to socket ID
  socket.on('register', (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });


  socket.on('message', (data) => {
    if (data && data.receiver_id && data.message && data.sender_id) {
      const receiverSocketId = userSockets[data.receiver_id];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('message', data);
      }
    }
  });


  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Optionally, remove user from userSockets when they disconnect
    for (const [userId, socketId] of Object.entries(userSockets)) {
      if (socketId === socket.id) {
        delete userSockets[userId];
        console.log(`User ${userId} unregistered`);
        break;
      }
    }
  });
});

httpServer.listen(3500, () => console.log('Server listening on port 3500'));

