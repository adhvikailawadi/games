import React, { useState, useEffect } from "react";
import { io as createSocket } from "socket.io-client";

const socket = createSocket("http://localhost:3001");

export default function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [game, setGame] = useState(null);

  useEffect(() => {
    socket.on("gameState", (state) => {
      setGame({ ...state });
    });

    return () => {
      socket.off("gameState");
    };
  }, []);

  if (!username) {
    return (
      <div className="app-shell">
        <div className="card">
          <h1>Enter username</h1>
          <input
            className="text-input"
            placeholder="Username"
            onBlur={(e) => {
              if (e.target.value) {
                localStorage.setItem("username", e.target.value);
                setUsername(e.target.value);
              }
            }}
          />
        </div>
      </div>
    );
  }

  if (!joined) {
    return (
      <div className="app-shell">
        <div className="card">
          <h1>Join a room</h1>
          <input
            className="text-input"
            placeholder="Room Code"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            className="primary-button"
            onClick={() => {
              if (room) {
                socket.emit("joinRoom", { room, username });
                setJoined(true);
              }
            }}
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  if (!game) return <div className="app-shell"><div className="card">Loading game...</div></div>;

  const me = game.players.find((p) => p.username === username);

  return (
    <div className="app-shell">
      <div className="card wide">
        <h1>Room: {room}</h1>
        <div className="game-info">
          <div>
            <strong>Top Card</strong>
            <p>{game.topCard?.color} {game.topCard?.value}</p>
          </div>
          <div>
            <strong>Turn</strong>
            <p>{game.players[game.turn]?.username}</p>
          </div>
        </div>

        <div className="hand-grid">
          {me?.hand.map((card, i) => (
            <button
              key={i}
              className="card-button"
              onClick={() => socket.emit("playCard", { room, cardIndex: i })}
            >
              {card.color} {card.value}
            </button>
          ))}
        </div>

        <div className="player-list">
          <h2>Players</h2>
          {game.players.map((p, i) => (
            <p key={i}>{p.username}: {p.hand.length} cards</p>
          ))}
        </div>
      </div>
    </div>
  );
}
