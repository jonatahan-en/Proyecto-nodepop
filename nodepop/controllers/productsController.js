import Product from '../models/Product.js'
export function index(req,res,next){
    res.render('new-product')
}

export async function postNew(req,res, next){
    try { 
        const {name, price, image, tags} = req.body
        // si tags es una cadena convierlelo en un array
        const tagsArray = tags.split(',').map(tag => tag.trim());
        // creo una instancia en product en memoria 
        const product = new Product({name, price, image, tags:tagsArray})
        // TODO VALIDACION
        // lo guardo en base de datos
        await product.save()
        res.redirect('/')
    } catch (error) {
        next(error)     
    }
}

