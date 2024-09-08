const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dashController')
const { isLoggedIn } = require('../middleware/checkAuth')

router.get('/dashboard', isLoggedIn, dashController.dashboard)
router.get('/dashboard/item/:id', isLoggedIn, dashController.dashboardViewNote)
router.put('/dashboard/item/:id', isLoggedIn, dashController.dashboardUpdateNote)

module.exports = router