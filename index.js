const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

//import library
const Svalbard = require('./server/svalbard.js')

// Confifure CORS on the server and parsing body inputs
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const svalbard = new Svalbard(process.env.PORT)

//create a router
const router = express.Router()

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log(`API recieved ${req.method}: ${req.originalUrl}`)
    next()
})

router.get('/', function(req, res) {
    res.json({ message: 'pong' })   
})

router.route('/svalbard')
    .get(async function(req, res) {
        try {
            const resp = await svalbard.get(req.params, req.query)

            //verify if needed
            res.json(resp)
        } catch (err) {
            res.status(400).json(err.message)
        }  
    })

    .post(async function(req, res) {
        try {
            const resp = await svalbard.post(req.params, req.query)

            //verify if needed
            res.json(resp)
        } catch (err) {
            res.status(400).json(err.message)
        } 
    })

//handle routes with and id/key attached
router.route('/svalbard/:sgsv_taxon_id')
    .get(async function(req, res) {
        try {
            const resp = await svalbard.get(req.params, req.query)

            //verify if needed
            res.json(resp)
        } catch (err) {
            res.status(400).json(err.message)
        }
    })

    .put(async function(req, res) {
        try {
            const resp = await svalbard.put(req.params, req.query)

            //verify if needed
            res.json(resp)
        } catch (err) {
            res.status(400).json(err.message)
        }
    })

    .delete(async function(req, res) {
        try {
            const resp = await svalbard.delete(req.params, req.query)

            //verify if needed
            res.json(resp)
        } catch (err) {
            res.status(400).json(err.message)
        }
    })

router.route('/reset')
    .patch(async function(req, res) {
        try {
            const resp = await svalbard.reset()

            //verify if needed
            res.json(resp)
        } catch (err) {
            res.status(400).json(err.message)
        }
    })

router.route('/meta')
    .get(async function(req, res) {
        res.json({
            keys: svalbard.key_list, 
            length: svalbard._json.length
        })
    })


app.use('/api', router)
app.use('/', express.static('pages'))
app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))
