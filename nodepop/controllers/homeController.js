import assert from 'node:assert'
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
