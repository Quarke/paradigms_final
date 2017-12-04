class Info {
  constructor(data) {
    this._data = data
    this.info_area = document.getElementById('info_area')
    this._ul = document.createElement('ul')
    this._ul.className = "mdl-list mdl-cell--6-col mdl-cell--3-offset"
  }

  static async createLI(key, val){
    let inner_html = 
    `
    <li class="mdl-list__item mdl-list__item--three-line">
        <span class="mdl-list__item-primary-content">
          <i class="material-icons mdl-list__item-avatar">info</i>
          <span>${key}</span>
          <span class="mdl-list__item-text-body">
            ${val}
          </span>
        </span>
    </li>
    `
    return inner_html
  }

  static async createNew(data){
    console.log(data)
    let info = new Info(data)
    for (let key in info._data) {
        if (info._data.hasOwnProperty(key)) {
            const li = await Info.createLI(key, info._data[key])
            const t = document.createElement('div')
            t.innerHTML = li
            info._ul.appendChild(t)
        }
    }

    info.info_area.appendChild(info._ul)
    return info
  }
}