const fs = require('fs')
const len = 12

module.exports = class Svalbard {
    constructor(){
        this._json = JSON.parse( fs.readFileSync('./data/svalbard.json') )
        this.key_list = Object.keys(this._json[0])
        // console.log(this._json[0])
        // console.log(this._json.length)
        // console.log(this.key_list)
    }

    async sanitize_keys(obj){
        return obj
    }

    async get(opts, query) {
        // check if no args revieved i.e. return all requests
        if(Object.keys(opts).length === 0 && opts.constructor === Object){
            const skip = parseInt(query.$skip ? query.$skip : 0)
            let skipped = 0
            let resp = []
            if(query.$search){
                const term = query.$search.toLowerCase()
                for(let entry of this._json){
                    if(entry.genus.toLowerCase().includes( term ) ||
                        entry.full_scientific_name.toLowerCase().includes( term ) ||
                        entry.species.toLowerCase().includes( term )
                    ){
                        if(skipped < query.$skip){
                            skipped++
                        } else {
                            resp.push(entry)
                            if(resp.length >= len){
                                break;
                            }
                        }
                    }
                }
                return resp
            } else {
                return this._json.slice(skip, skip + len)
            }
        }
        else {
            const key = Object.keys(opts)[0]
            const val = opts[key]

            let resp = null
            for(let entry of this._json){
                if(entry[key] == val){
                    resp = entry
                    break
                }
            }
            if(resp != null){
                return resp
            }
            else {
                throw new Error(`Entry not found for ${key}:${val}`)
            }
        }
    }

    async put(opts, query){
        // requires a reqeust matching the query to exist
        try{
            const resp = await this.get(opts, query)
            if(resp.length > 1){
                throw new Error("Illegal request, non-unary match")
            } else {
                // resp is the entry to modify
                Object.assign(resp, opts)
                 for(let entry of this._json){
                    if(entry.sgsv_taxon_id == resp.sgsv_taxon_id){
                        entry = resp
                        break
                    }
                }
                return resp
            }
        } catch(err){
            throw err
        }
    }

    async post(opts, query){
        if(Object.keys(opts).length === 0 && opts.constructor === Object){
            throw new Error("Illegal request")
        } else {
            if( opts.hasOwnProperty('sgsv_taxon_id') && opts.hasOwnProperty('genus') && opts.hasOwnProperty('species')){
                let found = false
                for(let entry in this._json){
                    if(opts.sgsv_taxon_id == entry.sgsv_taxon_id){
                        found = true
                        break
                    }
                }
                if(found){
                    throw new Error("ID already exists")
                } else {
                    this._json.push(opts)
                    return opts
                }
            } else {
                throw new Error("Illegal request")
            }
        }
    }

    async delete(opts, query){
        if(opts.hasOwnProperty('sgsv_taxon_id')){
            const pre_len = this._json.length
            this._json = this._json.filter(entry => {
                return entry.sgsv_taxon_id != opts.sgsv_taxon_id
            })
            if(pre_len == this._json.length){
                throw new Error("No entry found with specified id")
            } else {
                return Object.assign(opts, {'result': 'deleted'})
            }
        }
        else {
            throw new Error("Illegal request")
        }
    }

    async reset(){
        this._json = JSON.parse( fs.readFileSync('./data/svalbard.json.orig') )
        this.key_list = Object.keys(this._json[0])
        console.log(this._json[0])
        console.log(this._json.length)
        console.log(this.key_list)  
    }
}

