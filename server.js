// Dependencies
const express = require ('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// Configuration
require('dotenv').config()
const PORT = process.env.PORT
// console.log(PORT)
const app = express()

// Middleware
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGO_URI, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongo: ', process.env.MONGO_URI);
}).catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
});


// Routes
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Bakers
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// Listen
app.listen(PORT, () => {
    console.log('Listen on port', PORT);
})

app.get('*', (req, res) => {
    res.send('404')
})