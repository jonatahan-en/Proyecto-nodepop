import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import * as homeController from './controllers/homeController.js'

// Creamos una instancia para express
const app = express()

// para que en todas las vistas se lea Nodepop
app.locals.PopName = 'Nodepop!'

//variable predefinida de express(views) se coenecta con html
app.set('views', 'views')// views folder
app.set('view engine', 'ejs')

// realizar el registro de las peticiones con morgan informacion en consola
app.use(logger('dev'))


//rutas de la aplicacion(application routes)
app.get('/', homeController.index)



// catch 404 and forwart to error handler
app.use((req, res, next) => {
    next(createError(404))
})
//error handler
app.use((err, req, res, next) =>{
    res.status(err.status || 500)
    res.send('Ocurrio un error :' + err.message)
})

export default app