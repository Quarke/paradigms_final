class Doc_Interface {
  constructor() {
    this.card_area = document.getElementById('card_area')
    this.fwd_button = document.getElementById('forward') 
    this.bck_button = document.getElementById('back')
    this.search_bar = document.getElementById('search_bar')

    this.submit_btn = document.getElementById('submit_btn')

    const self = this
    this.fwd_button.addEventListener("click", function(){
      self.next()
    })

    this.bck_button.addEventListener("click", function(){
      self.back()
    })

    this.search_bar.addEventListener("keyup", debounce(function(e) {
      Svalbard_API.$search = e.target.value
      self.renew()
    }, 200))

    this.submit_btn.addEventListener('click', async function(){
      const data = {
         "genus": document.getElementById("genus").value,
         "species": document.getElementById("species").value,
         "full_scientific_name": document.getElementById("full_name").value,
         "sgsv_taxon_id": document.getElementById("sgsv_taxon_id").value,
         "seed_boxes": document.getElementById("seed_boxes").value,
         "seeds": document.getElementById("seeds").value,
         "countries": document.getElementById("countries").value
      }
      const resp = await Svalbard_API.post(data)
      console.log(resp)
    })
  }

  async addChild(child){
    this.card_area.appendChild(child.elem)
  }

  async removeAllChildren(){
    while (this.card_area.hasChildNodes()) {
      this.card_area.removeChild(this.card_area.lastChild)
    }
  }

  async next(){
    await this.removeAllChildren()

    let curr_skip = Svalbard_API.$skip
    curr_skip += 12
    if (curr_skip > 12075){
      curr_skip = 12075
    }
    const resp = await Svalbard_API.get(curr_skip)
    console.log(resp)

    for(let entry of resp){
        let child = await Card.createNew(entry)
        this.addChild(child)
    }
  }

  async back(){
    await this.removeAllChildren()

    let curr_skip = Svalbard_API.$skip
    curr_skip -= 12
    if (curr_skip < 0){
      curr_skip = 0
    }
    const resp = await Svalbard_API.get(curr_skip)
    console.log(resp)

    for(let entry of resp){
        let child = await Card.createNew(entry)
        this.addChild(child)
    }
  }

  async renew(){
    await this.removeAllChildren()
    Svalbard_API.$skip = 0
    let curr_skip = Svalbard_API.$skip ? Svalbard_API.$skip : 0
    const resp = await Svalbard_API.get(curr_skip)

    for(let entry of resp){
        let child = await Card.createNew(entry)
        this.addChild(child)
    }
  }
}

class Card {
  constructor(guid, data) {
    this._guid = guid // This is a "pretty good" uuid
    this.elem = document.createElement('div')
    this.elem.className = "mdl-cell mdl-cell--3-col"
    this._inner_html = 
      `
      <div class="mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">${data.full_scientific_name}</h2>
        </div>
        <div class="mdl-card__supporting-text">
          Genus: ${data.genus}, Species: ${data.species}
        </div>
        <div class="mdl-card__actions mdl-card--border">
          <a href="#fixed-tab-2" id="info_button" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Info
          </a>
        </div>
      </div>
      `
      this.elem.innerHTML = this._inner_html
      this.elem.addEventListener('click', function() {
        console.log("here", data)
        let tab1 = document.getElementById("fixed-tab-1")
        tab1.classList.remove("is-active")

        let tab2 = document.getElementById("fixed-tab-2")
        tab2.classList.add("is-active")

        this._info = Info.createNew(data)
      })
  } 

  static async createNew(data){
    const guid = await generate_guid(10)
    return new Card(guid, data)
  }
}