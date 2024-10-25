import express from 'express'
import http from 'node:http'

const app = express()

app.get('/',(req, res, next) => {
    res.send('Hola jonathan')
})


// Create http server

const server = http.createServer(app)

server.on('listening', () => {console.log('Servicio arrancado')})
server.listen(3001)