function generate_guid(count) {
    let _sym = 'abcdefghijklmnopqrstuvwxyz1234567890'
    var guid = ''

    for(let i = 0; i < count; i++) {
        guid += _sym[parseInt(Math.random() * (_sym.length))]
    }

    return guid  // otherwise, recurse on generate
}

//taken from standard underscore library
function debounce(func, delay) {
  console.log("called")
  var inDebounce = undefined;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(inDebounce);
    return inDebounce = setTimeout(function() {
      return func.apply(context, args);
    }, delay);
  }
}

class Svalbard_API {
  constructor() {
    this.$skip = 0
    this.$search = null
  }

  static async get(skip, search) {
    this.$skip = skip ? skip : 0
    let url = `http://localhost:3000/api/svalbard?$skip=${this.$skip}`
    if(this.$search && this.$search != ""){
      url += `&$search=${this.$search}`
    }
    console.log(url)
    const resp = await fetch(url)
    return resp.json()
  }

  static async find(id) {
    const resp = await fetch(`http://localhost:3000/api/svalbard/${id}`)
    return resp.json()
  }

  static async put(id, data) {
    const resp = await fetch("http://localhost:3000/api/svalbard/id", {
        method: 'PUT',
        mode: 'cors', 
        redirect: 'follow',
        body: JSON.stringify({
           data
        })
    })
    return resp.json()
  }

  static async post(data) {
    const resp = await fetch("http://localhost:3000/api/svalbard", {
        method: 'POST',
        mode: 'cors', 
        redirect: 'follow',
        body: JSON.stringify({
           data
        })
    })
    return resp.json()
  }

  static async delete(id, data) {
    const resp = await fetch("http://localhost:3000/api/svalbard/id", {
        method: 'DELETE',
        mode: 'cors', 
        redirect: 'follow',
        body: JSON.stringify({
           data
        })
    })
    return resp.json()
  }

  static async reset(){
    const resp = await fetch("http://localhost:3000/api/reset", {
        method: 'PATCH',
        mode: 'cors', 
        redirect: 'follow'
    })
    return resp.json()
  }

  static async meta(){
    const resp = await fetch("http://localhost:3000/api/meta", {
        method: 'GET',
        mode: 'cors', 
        redirect: 'follow'
    })
    return resp.json()
  }
}
