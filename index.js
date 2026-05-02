import http from "node:http"
import path from "node:path"

import express from 'express'
import { Server } from "socket.io"

const CHECKBOX_SIZE = 200

const state = {
    checkboxes: new Array(CHECKBOX_SIZE).fill(false)
}


 async function main(){
    const PORT = process.env.PORT ?? 9090
    const app = express()
    const server = http.createServer(app)
    app.use(express.static(path.resolve('./public')))
    const io = new Server(server)

    app.get('/checkboxes', (req, res) =>{
        return res.json({checkboxes: state.checkboxes})
    })


    io.on('connection', (socket)=>{
        console.log(`a new socket has been connected ${socket.id}`)
        socket.on("client:checkbox-action", (data)=>{
            console.log(`checkbox for id ${data.id} has been changed and its state is ${data.state}`)
            state.checkboxes[data.id] = data.state
            socket.broadcast.emit('server:checkbox-action', data)
        })
    })

    app.get(`/health`, (req, res)=>{
       res.send({'health':true})
    })
    server.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}

main()