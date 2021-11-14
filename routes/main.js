const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', (req, res) => {
    // res.send()
    res.render('login')
})

router.get('/search', (req, res) => {
    // res.send()
    res.render('search')
})

router.get('/view/:slug', (req, res) => {
    // res.send()
    let slug = req.params.slug
    res.render('view', { slug })
})

module.exports = router