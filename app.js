require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')

const connectDB = require('./server/config/db')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')

const app = express()
const port = process.env.PORT || 3000

app.set('trust proxy', 1)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        mongoOptions: {
            serverSelectionTimeoutMS: 5000
        }
    })
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))

connectDB()

app.use(express.static(path.join(__dirname, 'public')))

app.use(expressLayouts)

app.set('views', path.join(__dirname, 'views'))
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    res.locals.currentRoute = req.path.replace(/\/$/, '') || '/';
    res.locals.user = req.user || null;
    next();
})

//Routes
app.use('/', require('./server/routes/auth'))

app.use('/', require('./server/routes/index'))

app.use('/', require('./server/routes/dashboard'))

app.get('*', function(req, res){
    res.status(404).render('404')
})

app.use((err, req, res, next) => {
    console.error('Express Error:', err);
    res.status(500).send(`
        <div style="font-family: sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; text-align: center;">
            <h2>Server Error</h2>
            <p>${err.message || 'An unexpected error occurred.'}</p>
            <a href="/" style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background: #0d6efd; color: white; text-decoration: none; border-radius: 4px;">Return Home</a>
        </div>
    `);
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

module.exports = app