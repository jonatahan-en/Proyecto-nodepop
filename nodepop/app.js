import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import connectMongoose from './lib/connectMongoose.js'
import * as sessionManager from './lib/sessionManager.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as productController from './controllers/productsController.js'

// conexion de mongoose
await connectMongoose()
console.log('Conectado a mongoDB ')    
// Creamos una instancia para express
const app = express()
// para que en todas las vistas se lea Nodepop
app.locals.PopName = 'Nodepop'
//variable predefinida de express(views) se coenecta con html
app.set('views', 'views')// views folder
app.set('view engine', 'ejs')
// realizar el registro de las peticiones con morgan informacion en consola
app.use(logger('dev'))
// que parsear el body 
app.use(express.json())//que venga en formato JSON
app.use(express.urlencoded({extended: true }))// que venga urlencoded(formularios)



//rutas de la aplicacion(application routes)
app.use(sessionManager.middleware, sessionManager.useSessionInViews)
// public pages
app.get('/', homeController.index)
app.get('/list_in_product',homeController.listInpruductValidation, homeController.listInProduct)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)
app.use(express.static('public'));

// private pages
app.get('/products/new',sessionManager.isLoggedIn, productController.index)
app.post('/products/new',sessionManager.isLoggedIn, productController.postNew)



// catch 404 and forwart to error handler
app.use((req, res, next) => {
    next(createError(404))
})
//error handler
app.use((err, req, res, next) =>{
    // validacion errores
    if(err.array){
        console.log(err.array())
        err.message = 'Invalid request: ' + err.array()
        .map(err =>`${err.location} ${err.type} ${err.path} ${err.msg}`).join(', ')
        err.status = 422
    }


    res.status(err.status || 500)
    
    // set locals, only providing error in development(vistas error)
    res.locals.message = err.message
    res.locals.error = process.env.NODEPOP_ENV === 'development'? err : {} // solo modo desarrollo
    // render error view
    res.render('error')

})

export default app