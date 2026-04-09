import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server, { cors: { origin: "*" } });

let rooms = {};

ioServer.on("connection", (socket) => {
  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);

    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        turn: 0,
        deck: createDeck(),
        topCard: null,
      };

      rooms[room].players.push({
        id: socket.id,
        username,
        hand: rooms[room].deck.splice(0, 7),
      });
      rooms[room].topCard = rooms[room].deck.pop();
    } else {
      rooms[room].players.push({
        id: socket.id,
        username,
        hand: rooms[room].deck.splice(0, 7),
      });
    }

    ioServer.to(room).emit("gameState", rooms[room]);
  });

  socket.on("playCard", ({ room, cardIndex }) => {
    const game = rooms[room];
    if (!game) return;

    const player = game.players.find((p) => p.id === socket.id);
    if (!player) return;

    if (game.players[game.turn].id !== socket.id) return;

    const card = player.hand[cardIndex];
    if (!card) return;

    if (
      card.color === game.topCard.color ||
      card.value === game.topCard.value ||
      card.color === "wild"
    ) {
      player.hand.splice(cardIndex, 1);
      game.topCard = card;
      game.turn = (game.turn + 1) % game.players.length;
    }

    ioServer.to(room).emit("gameState", game);
  });

  socket.on("disconnect", () => {
    for (const roomName in rooms) {
      const game = rooms[roomName];
      const playerIndex = game.players.findIndex((p) => p.id === socket.id);
      if (playerIndex !== -1) {
        game.players.splice(playerIndex, 1);
        if (game.turn >= game.players.length) {
          game.turn = 0;
        }

        if (game.players.length === 0) {
          delete rooms[roomName];
        } else {
          ioServer.to(roomName).emit("gameState", game);
        }
      }
    }
  });
});

function createDeck() {
  const colors = ["red", "green", "blue", "yellow"];
  let deck = [];
  colors.forEach((color) => {
    for (let i = 0; i <= 9; i++) deck.push({ color, value: i });
  });
  return deck.sort(() => Math.random() - 0.5);
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

server.listen(3001, () => console.log("Server running on port 3001"));
