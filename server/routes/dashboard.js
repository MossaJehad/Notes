const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dashController')

router.get('/dashboard', dashController.dashboard)

module.exports = router