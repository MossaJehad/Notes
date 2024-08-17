require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000 || process.env.PORT

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

app.use(expressLayouts)

app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

//Routes
app.use('/', require('./server/routes/index'))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})