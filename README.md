# Real-Time Checkbox Sync (Socket.IO)

A simple real-time web application where multiple users can interact with a shared set of checkboxes.  
When one user toggles a checkbox, the change is instantly reflected for all other connected users.

---

## 🚀 Features

- Real-time synchronization using WebSockets (Socket.IO)
- Dynamic generation of checkboxes (no hardcoding)
- Event-driven architecture (client ↔ server communication)
- **Redis Pub/Sub** for multi-server instance support (horizontal scaling)
- **Persistent State** via Redis (states survive server restarts)

---

## 🧠 How It Works

1. User clicks a checkbox on the frontend  
2. Frontend emits an event with:
   - checkbox `id`
   - current state as `isChecked` (boolean)
3. Server receives the event  
4. Server updates the unified state stored in **Redis**.
5. Server publishes the event via Redis Pub/Sub so all server instances receive it.
6. Servers broadcast the update to all connected clients  
7. Other clients receive the event and update their UI accordingly  

> Note: We are now using **Redis** for persistent storage and Pub/Sub. The state of checkboxes is preserved across server restarts, and the application now supports multiple server instances concurrently!

---

## ⚡ Performance

- Uses a highly optimized, static native Dark Mode CSS theme.
- Avoids expensive CSS transitions and pseudo-elements to ensure the browser can scale and render massive numbers of checkboxes (tested for scale up to 1 million).

---

## 🛠️ Tech Stack

- Node.js
- Express
- Socket.IO
- **Redis** (Storage & Pub/Sub)
- Vanilla JavaScript (DOM manipulation)

---

## 📂 Project Structure

```
project/
│
├── public/
│   ├── index.html
│   └── styles.css
│
├── index.js
├── package.json
└── pnpm-lock.yaml
```

---

## ⚙️ Setup & Run

### 1. Install dependencies

```
pnpm install
```

### 2. Start the server(s)

You must have **Redis** running locally or accessible.

```
node index.js
```
*Or use `pnpm dev` if configured in package.json.*
*You can spin up multiple servers on different ports using `$env:PORT=9100 node index.js`!*

### 3. Open in browser

```
http://localhost:9090
```

Open multiple tabs to test real-time behavior.

---

## ⚠️ Current Limitations

- No rate limiting or validation on incoming checkbox toggles.

---

## 🔮 Future Improvements

- Add rate limiting to prevent abuse
- Add authentication layer

---

## 💡 Learning Outcome

This project helped in understanding:
- Event-driven systems
- WebSocket communication
- Real-time UI synchronization
- Importance of sending state instead of just actions

---

## 📌 Author

Built as part of learning real-time systems and backend development.