import test from 'ava';
require('isomorphic-fetch')

const Svalbard = require('./svalbard.js')
const svalbard = new Svalbard()

test("Test GET", async t => {
    const skip = 0
    try {
        const resp = await svalbard.get({}, {'$skip': skip})
        t.pass( resp.length, 12)
    } catch (err) {
        t.fail(err)
    }
})

test("Test FIND", async t => {
    let opt = {'sgsv_taxon_id': '3423'}
    try {
        const resp = await svalbard.get(opt, {})
        t.pass( resp.sgsv_taxon_id, '3423')
    } catch (err) {
        t.fail(err)
    }
})

test("Test SEARCH", async t => {
    const search = 'Poa'
    try {
        const resp = await svalbard.get({}, {'$search': search})
        t.pass( resp.genus, 'Poa')
    } catch (err) {
        t.fail(err)
    }
})


test("Test PUT", async t => {
    let data = {'sgsv_taxon_id': '3423', "genus": "Not a real genus" }

    try {
        let resp = await svalbard.put(data, {})
        t.pass( resp.genus, 'Not a real genus')
    } catch (err) {
        t.fail(err)
    }
})


test("Test POST", async t => {
    let data = { 
        sgsv_taxon_id: '12838123981',
        continents: '1',
        countries: '1',
        itis_tsn: '',
        seed_boxes: '1',
        infraspesific_epithet: '',
        species_epithet: 'false',
        taxon_authority: '',
        vernacular_name: '',
        seeds: '',
        full_scientific_name: 'Fake News',
        sgsv_by_taxon_id: '1037539',
        genus: 'Fake',
        species: 'Fake News',
        accessions: '1' 
    }

    try {
        let resp = await svalbard.post(data, {})
        t.pass( resp.species, 'Fake News')
    } catch (err) {
        t.fail(err)
    }
})

test("Test DELETE", async t => {
    let data = {'sgsv_taxon_id': '3423' }

    try {
        let resp = await svalbard.delete(data, {})
        t.pass( resp.result, 'Deleted')
    } catch (err) {
        t.fail(err)
    }
})

