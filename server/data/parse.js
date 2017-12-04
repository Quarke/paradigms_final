const JSONStream = require('JSONStream')
const es = require('event-stream')
const fs = require('fs')
const feathers = require('feathers/client')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest/client')
const axios = require('axios')
const ost = require('object-stream-tools')

const api = feathers()
  .configure( rest('http://localhost:3030').axios(axios) )
  .configure( hooks() )

// const resp = api.service('museum').find({}).then(resp => {
// 	console.log(resp)
// })

obj = []
let start = new Date()
fs.createReadStream('test.json')
.pipe(JSONStream.parse('*'))
.on('data', data => {
    obj.push(data)
})
.on('end', data => {
    console.log(obj.filter(n => n.genus == "Poa"))

    names = obj.map(n => n.full_scientific_name)
    console.log(names)
})
