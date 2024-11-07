import User from '../models/user.js'
// Vamos hacer un metodo para que renderice la pagina de login
export function index(req, res, next){
    res.locals.error = ''
    res.locals.username = ''
    res.locals.email = ''
    res.render('login')

}

export async function postLogin(req,res ,next){
    try {
        const {username, email, password} = req.body
        // buscar el usyuario de la base de datos
        const user = await User.findOne({username: username.toLowerCase()})
        // si no lo encuentro, o la contraseña no coincide --> error
        if (!user || !(await user.comparePassword(password)))  {
            res.locals.error = 'Invalid credentials'
            res.locals.username = username
            res.locals.email = email
            res.render('login')
            return
        }


        // si el usuario existe y la contraseña coincide
        req.session.userId = user._id
        req.session.userName = user.username

       // redirect a la home 
        res.redirect('/')   
    } catch (error) {
        next(error)
        
    }
}

export function logout(req, res, next){
    req.session.regenerate(err => {
        if (err) return next(err)
            res.redirect('/')
    })
}