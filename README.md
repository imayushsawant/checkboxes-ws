# Real-Time Checkbox Sync (Socket.IO)

A simple real-time web application where multiple users can interact with a shared set of checkboxes.  
When one user toggles a checkbox, the change is instantly reflected for all other connected users.

---

## 🚀 Features

- Real-time synchronization using WebSockets (Socket.IO)
- Dynamic generation of checkboxes (no hardcoding)
- Event-driven architecture (client ↔ server communication)
- Multi-client state updates (broadcasting changes)

---

## 🧠 How It Works

1. User clicks a checkbox on the frontend  
2. Frontend emits an event with:
   - checkbox `id`
   - current `state` (checked/unchecked)  
3. Server receives the event  
4. Server broadcasts the update to all other clients  
5. Other clients receive the event and update their UI accordingly  

> Note: There is no persistent database storage yet.  
New users will see the current in-memory state fetched via an API upon load, but all states reset when the server restarts (this will be solved using Redis in the next iteration).

---

## ⚡ Performance

- Uses a highly optimized, static native Dark Mode CSS theme.
- Avoids expensive CSS transitions and pseudo-elements to ensure the browser can scale and render massive numbers of checkboxes (tested for scale up to 1 million).

---

## 🛠️ Tech Stack

- Node.js
- Express
- Socket.IO
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

### 2. Start the server

```
node index.js
```
*Or use `pnpm dev` if configured in package.json.*

### 3. Open in browser

```
http://localhost:9090
```

Open multiple tabs to test real-time behavior.

---

## ⚠️ Current Limitations

- State is only saved in-memory during the server's lifecycle (server restarts reset all checkboxes)
- In-memory array might consume significant RAM if scaled up to 1 million checkboxes on the backend
- No rate limiting or validation

---

## 🔮 Future Improvements

- Add Redis as a source of truth
- Persist checkbox states
- Handle multiple server instances (Pub/Sub)
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