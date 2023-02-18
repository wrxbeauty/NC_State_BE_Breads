// Dependencies
const express = require ('express')

// Configuration
require('dotenv').config()
const PORT = process.env.PORT
// console.log(PORT)
const app = express()

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Listen
app.listen(PORT, () => {
    console.log('Listen on port', PORT);
})