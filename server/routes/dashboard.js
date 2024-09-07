const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dashController')
const { isLoggedIn } = require('../middleware/checkAuth')

router.get('/dashboard', isLoggedIn, dashController.dashboard)

module.exports = router