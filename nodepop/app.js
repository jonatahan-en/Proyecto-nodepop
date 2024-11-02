import express from 'express'

// Creamos una estancia para express
const app = express()

app.get('/', (req, res, next) => {
    res.send('Hola')
})

export default app