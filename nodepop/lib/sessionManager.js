import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 48
// middleware para gestionar sessiones 
export const middleware = session({
    name:'nodepop-session',
    secret: 'tyfsxuyw6svxgs4w8cjhgvz8bb42vb8972dvsakxn52s27252',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    // las sesiones se guardan en mongoDB
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/nodepop'
    })
})

export function useSessionInViews(req, res,next){
    res.locals.session = req.session
    next()
} 