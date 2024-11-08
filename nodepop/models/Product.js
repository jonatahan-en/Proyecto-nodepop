import mongoose, { Schema } from 'mongoose'

// definir el esquema de los productos

const productSchema = Schema({
    name: { type: String , unique: true},
    price: Number,
    image: String,
    tags: [String]
})
// Creamos el modelo de products

const Product = mongoose.model('Product', productSchema)


export  default Product
