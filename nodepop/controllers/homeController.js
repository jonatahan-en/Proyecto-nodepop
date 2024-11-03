export function index(req, res, next){
    res.locals.users = [
        {name: 'Smit', age: 30},
        {name: 'Broms', age: 24},
    ]
    res.render('home')
}