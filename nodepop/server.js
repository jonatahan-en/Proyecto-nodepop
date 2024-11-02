import express from 'express'
import http from 'node:http'

// creamos una instancia de express
const app = express()


app.get('/', (req, res, next) => {
    res.send('Hola')
})

// Create http server
const server = http.createServer(app)

server.on('listening',() => {console.log('Servidor arrancado')})
server.listen(3100)