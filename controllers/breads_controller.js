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
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
    .then(foundBread => {
        console.log(foundBread)
        res.render('show', {
            bread: foundBread
        })
    }).catch(err => {
        res.send('404')
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
breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('edit',{
                bread: foundBread
        // bread: Bread[req.params.indexArray],
        // index: req.params.indexArray
        })
    })
})


// Update
breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updateBread => {
            console.log(updateBread)
            res.redirect(`/breads/${req.params.id}`)
        })
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
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect('/breads')
        })
})

module.exports = breads