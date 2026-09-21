const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.homepage)
router.get('/about', mainController.about)
router.get('/features', mainController.features)
router.get('/faq', mainController.faq)
router.get('/faqs', (req, res) => res.redirect('/faq'))

module.exports = router