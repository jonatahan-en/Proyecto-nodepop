import session from 'express-session'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 48
// middleware para gestionar sessiones 
export const middleware = session({
    name:'nodepop-session',
    secret: 'tyfsxuyw6svxgs4w8cjhgvz8bb42vb8972dvsakxn52s27252',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS }
})

export function useSessionInViews(req, res,next){
    res.locals.session = req.session
    next()
}