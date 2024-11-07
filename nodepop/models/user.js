import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {type: String, required:true, unique: true},
    email: {type: String, required: true,  unique: true},
    password: { type: String, required:true}
})

//metodos estaticos, que hace un hash de una contraseña
userSchema.statics.hashPassword = function(clearPassword){
    return bcrypt.hash(clearPassword, 7)
}
// metodo de  instancia y comprueba que la password coincide
// en metodos de instancias NO USAR ARROW FUNCTION (SE PIERDE EL THIS)
userSchema.methods.comparePassword = function(clearPassword){
    return bcrypt.compare(clearPassword, this.password)
}

const User = mongoose.model('User', userSchema)


export default User