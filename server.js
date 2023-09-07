const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const path = require("path");

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.set("port", port);
const server = http.createServer(app);

const io = socketio(server);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    console.log(roomId);
    socket.join(roomId);
    // Broadcast to other users that a new user has joined
    socket.to(roomId).emit("user-connected", socket.id);
  });

  socket.on("offer", (offer, roomId) => {
    console.log({ roomId, offer });

    socket.to(roomId).emit("offer", offer);
  });

  socket.on("answer", (answer, roomId) => {
    console.log({ roomId, answer });

    socket.to(roomId).emit("answer", answer);
  });

  socket.on("ice-candidate", (candidate, roomId) => {
    console.log({ roomId, candidate });
    socket.to(roomId).emit("ice-candidate", candidate);
  });
});

server.on("error", (error) => {
  switch (error.name) {
    case "EADDRINUSE":
      logger.error(`Port ${port} is already in use.`);
      break;
    case "EACCES":
      logger.error(`Port ${port} requires elevated privileges.`);
      break;
    default:
      logger.error(error.message);
  }
});
