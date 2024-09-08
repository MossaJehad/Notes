const express = require('express')
const router = express.Router()
const dashController = require('../controllers/dashController')
const { isLoggedIn } = require('../middleware/checkAuth')

router.get('/dashboard', isLoggedIn, dashController.dashboard)
router.get('/dashboard/add', isLoggedIn, dashController.dashboardAddNote)
router.post('/dashboard/add', isLoggedIn, dashController.dashboardSubmitNote)
router.get('/dashboard/item/:id', isLoggedIn, dashController.dashboardViewNote)
router.put('/dashboard/item/:id', isLoggedIn, dashController.dashboardUpdateNote)
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashController.dashboardDeleteNote)
router.get('/dashboard/search', isLoggedIn, dashController.dashboardSearch)
router.post('/dashboard/search', isLoggedIn, dashController.dashboardSearchSubmit)

module.exports = router