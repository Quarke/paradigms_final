class Info {
  constructor(data) {
    this._data = data
    this.table_area = document.getElementById('table_body')
  }

  static async createLI(key, val){
    let inner_html = 
    `
      <td>${key}</td>
      <td>${val}</td>
    `
    return inner_html
  }

  static async createNew(data){
    let info = new Info(data)
    while (info.table_area.firstChild) {
      info.table_area.removeChild(info.table_area.firstChild)
    }

    for (let key in info._data) {
        if (info._data.hasOwnProperty(key)) {
            const tr = await Info.createLI(key, info._data[key])
            let temp = document.createElement('tr')
            temp.innerHTML = tr
            info.table_area.appendChild(temp)
        }
    }
    return info
  }
}