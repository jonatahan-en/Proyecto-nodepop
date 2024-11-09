import assert from 'node:assert'
import {query, validationResult} from 'express-validator'
import Product from '../models/Product.js'


export async function index(req, res, next) {
    try {
        const userId = req.session.userId;
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 3;

        const products = await Product.find({ owner: userId })
            .skip(skip).limit(limit);
        res.render('home', { products, skip, limit});
    } catch (error) {
        next(error);
    }
}



// GET / list_in_product?product=shows&size=M&color=blue
//validacion
export const listInpruductValidation = [
    query('product')
        .isLength({min:5})
        .withMessage('min 5 character'),
    query('size')
        .isNumeric({min:32, max:56})
        .withMessage('size min 32, max 56'),
    query('color')
        .isLength({min:1, max:10})
        .withMessage('Cararcteres entre 1 y 10')
        //.custom(value => value === '42')
]
export function listInProduct(req, res, next) {
    validationResult(req).throw()//IMPORTANTE
    const product = req.query.product
    const size = req.query.size
    const color = req.query.color
    res.send(`Validated:  product ${product}  size ${size} color ${color}`)
}