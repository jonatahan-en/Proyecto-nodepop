import Product from '../models/Product.js'
import createError from 'http-errors'


export function index(req,res,next){
    res.render('new-product')
}

export async function postNew(req,res, next){
    try { 
        const userId = req.session.userId
        const {name, price, image, tags} = req.body
        // si tags es una cadena convierlelo en un array
        const tagsArray = tags.split(',').map(tag => tag.trim());
        // creo una instancia en product en memoria 
        const product = new Product({name, price, image, tags:tagsArray, owner:userId})
        // TODO VALIDACION
        // lo guardo en base de datos
        await product.save()
        res.redirect('/')
    } catch (error) {
        next(error)     
    }
}
// boorrar un producto 
export async function deleteProduct(req, res, next) {
    const userId = req.session.userId
    const productId = req.params.productId
    // validar que el elememnto que queremos borrar es propiedad del usuario logado'MUY IMPORTANTE 
    const product = await Product.findOne({ _id: productId})
    // verificarn que existe
    if(!product){
        console.warn(`WARNING - el usuario ${userId} esta intentando eliminar un producto inexistente`)
        next(createError(404, 'Not found'))
    }
    if (product.owner.toString() !== userId) {
        console.warn(`WARNING - el usuario ${userId} esta intentando eliminar un producto de otro usuario`)
        next(createError(401, 'Not authorized'))
    }
    await Product.deleteOne({ _id: productId})
    res.redirect('/')
}

