import test from 'ava';
require('isomorphic-fetch')

test("Test GET", async t => {
    const skip = 0
    let url = `http://localhost:3000/api/svalbard?$skip=${skip}`
    const resp = await fetch(url)
    t.pass( resp.json().length, 12)
})

test("Test FIND", async t => {
    let url = `http://localhost:3000/api/svalbard/3423`
    const resp = await fetch(url)
    t.pass( resp.json().id, 3423)
})

test("Test SEARCH", async t => {
    let url = `http://localhost:3000/api/svalbard?$search=Poa`
    const resp = await fetch(url)
    t.pass( resp.json().genus, "Poa")
})


test("Test PUT", async t => {
    let data = { "genus": "Not a real genus" }
    let id = 5000
    let resp = await fetch(`http://localhost:3000/api/svalbard/${5000}`, {
        method: 'PUT',
        mode: 'cors', 
        redirect: 'follow',
        body: JSON.stringify({
           data
        })
    })

    let url = `http://localhost:3000/api/svalbard/${id}`
    resp = await fetch(url)
    t.pass( resp.json().genus, "Not a real genus")
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
    let id = 12838123981
    let resp = await fetch("http://localhost:3000/api/svalbard", {
        method: 'POST',
        mode: 'cors', 
        redirect: 'follow',
        body: JSON.stringify({
           data
        })
    })
    console.log(resp)

    let url = `http://localhost:3000/api/svalbard/${id}`
    resp = await fetch(url)
    t.pass( resp.json().genus, "Fake")
})

test("Test DELETE", async t => {
    let id = 5000
    let resp = await fetch(`http://localhost:3000/api/svalbard/${id}`, {
        method: 'DELETE',
        mode: 'cors', 
        redirect: 'follow'
    })

    let url = `http://localhost:3000/api/svalbard/${id}`
    resp = await fetch(url)
    t.pass(resp.json(), `Entry not found for sgsv_taxon_id:${id}`)
})

