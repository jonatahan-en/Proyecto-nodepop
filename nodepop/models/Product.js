import mongoose, { Schema } from 'mongoose'

// definir el esquema de los productos

const productSchema = Schema({
    name: { type: String , unique: true},
    price: Number,
    image: String,
    tags: [String],
    owner:{type: Schema.Types.ObjectId, ref:'User'}
})
// Creamos el modelo de products

const Product = mongoose.model('Product', productSchema)


export  default Product
