# games

A multiplayer card game website built with React, Socket.io, and Express.

## Run locally
1. Install dependencies:

```bash
npm install
```

2. Start both backend and frontend together:

```bash
npm run dev:full
```

3. Open the browser at:

```text
http://localhost:5173
```

If you prefer to run each service separately:

```bash
npm run server
npm run dev
```

4. To run the production server after building:

```bash
npm run build
npm start
```

Then open:

```text
http://localhost:3001
```

## How to play
- Enter a username.
- Enter a room code.
- Click **Join Room**.
- Click a card to play it if it matches the top card's color or value.

## Deploy to Render
1. Push this repo to GitHub.
2. Create a free Render account at `https://render.com`.
3. Create a new Web Service and connect your GitHub repository.
4. Choose "Docker" for the environment.
5. Use the default `Dockerfile` and `npm start`.
6. After deploy, Render will give you a public site URL.
