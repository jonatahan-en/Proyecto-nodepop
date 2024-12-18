import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'
import User from './models/user.js'


const connection = await connectMongoose()
console.log('Connect to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if(questionResponse.toLowerCase() !== 'yes') {
    console.log('Operation aborted')
    process.exit()
}

await initUsers()
await initProducts()
connection.close()




async function initProducts() {
    // delete all agents
    const deleteResult = await Product.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} products`)

    const [megabox,altex] = await Promise.all([
        User.findOne({ username: 'megabox'}),
        User.findOne({ username: 'altex'}),
    ])

    // create initiala Products
    const insertResult = await Product.insertMany([
        {name: 'watches', price: 350,  image:'watch t55.jpg',tags:'mobile', owner: megabox._id},
        {name: 'changer', price: 38,  image:'Cargador.jpg',tags:'mobile', owner: megabox._id},
        {name: 'table appel 11 pro', price: 400,  image:'tablet ipad 11 pro.jpg',tags:'mobile', owner: altex._id}
    ])
    console.log(`Created ${insertResult.length} products.` )
}

async function initUsers() {
    // delete all Users
    const deleteResult = await User.deleteMany()
    console.log(`Deleted ${deleteResult.deletedCount} Users`)
    // create initiala Users
    
    const insertResult = await User.insertMany([
        {username: 'megabox', email: 'megabox@example.com', password: await User.hashPassword('1234')},
        {username: 'altex', email: 'altex@example.com', password: await User.hashPassword('1234')},
        {username: 'megaimagen', email: 'megaimagen@example.com',password: await User.hashPassword('1234')},
    ])
    console.log(`Created ${insertResult.length} users.` )
}
function ask(questionText){
    return new Promise((resolve, reject) =>{ 
        const consoleInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        consoleInterface.question(questionText, answer => {
            consoleInterface.close()
            resolve(answer)
        })
    })
}
