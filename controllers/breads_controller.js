// Dependencies
const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')

// Index
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
            // console.log(foundBreads)
        })
    // //res.send('This is the index at /breads')
    // res.render('index', {
    //     "breads": Bread,
    //     "title": "Breads Index Title"
    // });
})

// New
breads.get('/new', (req, res) => {
    res.render('new')
})

// Show
breads.get('/:arrayIndex', (req, res) => {
    Bread.findById(req.params.id)
    .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
        .catch(err => {
            res.send('404')
        })
    })
    // if (Bread[req.params.arrayIndex]) {
    //     res.render('Show', {
    //         bread: Bread[req.params.arrayIndex],
    //         index: req.params.arrayIndex,
    //     })
    // } else {
    //     res.send('404')
    // }
})

// Edit
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
})


// Update
breads.put('/:arrayIndex', (req, res) => {
    console.log("Updating Bread: " + req.params.arrayIndex)
    console.log(req.body)
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

// Create
breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    // Bread.push(req.body)
    res.redirect('/breads')
})

// Delete
breads.delete('/:indexArray', (req, res) => {
    console.log("Deleting Bread index: " + req.params.indexArray)
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
})


module.exports = breads