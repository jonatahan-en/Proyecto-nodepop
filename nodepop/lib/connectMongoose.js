import mongoose from 'mongoose'

mongoose.connection.on('error', err =>{
    console.log('error de conexión',err)
})

export default function connectMongoose(){
    return mongoose.connect('mongodb://127.0.0.1:27017/nodepop')
}