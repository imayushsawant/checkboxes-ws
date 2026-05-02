import http from "node:http"
import path from "node:path"

import express from 'express'
import { Server } from "socket.io"
import { publisher, subscriber, redis } from "./redis-connection.js"
import { json } from "node:stream/consumers"


const CHECKBOX_SIZE = 200
const CHECKBOX_STATE_KEY = 'checkbox-key'


async function main() {
    const PORT = process.env.PORT ?? 9090
    const app = express()
    const server = http.createServer(app)
    app.use(express.static(path.resolve('./public')))
    const io = new Server(server)

    await subscriber.subscribe("internal-server:checkbox-action")
    subscriber.on('message', (channel, message) => {
        if (channel === 'internal-server:checkbox-action') {
            const { id, isChecked } = JSON.parse(message)
            io.emit('server:checkbox-action', { id, isChecked })
        }
    })



    app.get('/checkboxes', async (req, res) => {
        const existingState = await redis.get(CHECKBOX_STATE_KEY)
        if (existingState) {
            const remoteData = JSON.parse(existingState)
            return res.json({ checkboxes: remoteData })
        }
        return res.json({ checkboxes:new Array(CHECKBOX_SIZE).fill(false) })
    })


    io.on('connection', (socket) => {

        console.log(`a new socket has been connected ${socket.id}`)

        socket.on("client:checkbox-action", async (data) => {
            console.log(`checkbox for id ${data.id} has been changed and its state is ${data.isChecked}`)

            const existingState = await redis.get(CHECKBOX_STATE_KEY)
            if (existingState) {
                const remoteData = JSON.parse(existingState)
                remoteData[data.id] = data.isChecked
                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData))
            }
            else {
                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(new Array(CHECKBOX_SIZE).fill(false)))
            }

            // state.checkboxes[data.id] = data.state
            // socket.broadcast.emit('server:checkbox-action', data)
            await publisher.publish("internal-server:checkbox-action", JSON.stringify(data))
        })
    })

    app.get(`/health`, (req, res) => {
        res.send({ 'health': true })
    })
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

main()