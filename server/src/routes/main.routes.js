const Router = require('express').Router()
const {
    map,
    intec,
    dgii
} = require('../controllers')

Router.get('/', async (req, res) => {
    res.json({
        map: await map.call(),
        intec: await intec.call(),
        dgii: await dgii.call()
    })
})

module.exports = Router;