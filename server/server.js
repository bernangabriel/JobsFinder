const express = require('express')
const morgan = require('morgan')
const cors=require('cors')
const app = express()
const config = require('./config')
const mainRoutes = require('./src/routes/main.routes')

//settings
app.set('port', process.env.PORT || config.port)

//middlewares
app.use(cors())
app.use(morgan('dev'))

//routes
app.get('/api/home', (req, res) => {
    res.json({
        message: 'this is test endpoint',
        at: new Date(),
        computer: process.env.computername,
        user: process.env.username
    })
})

app.use('/api/jobs', mainRoutes)

//listen
app.listen(app.get('port'), console.log(`webapi is running up on port: ${app.get('port')}`))