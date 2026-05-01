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

> Note: There is no persistent storage yet.  
New users will not see previous checkbox states (this will be solved using Redis in the next iteration).

---

## 🛠️ Tech Stack

- Node.js
- Express
- Socket.IO
- Vanilla JavaScript (DOM manipulation)

---

## 📂 Project Structure
