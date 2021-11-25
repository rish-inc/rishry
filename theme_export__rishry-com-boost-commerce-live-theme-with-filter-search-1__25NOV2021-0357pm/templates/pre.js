(() => {
  if (!document.querySelector('.pre-json')) return;
  class BuetifyPreJson {
    constructor(obj) {
      this.elms = document.querySelectorAll(`${obj.selector}`)
    }
    buetify() {
      [...this.elms].forEach(_elm => {
        const jsonText = _elm.textContent
        const jsonTextParse = JSON.parse(jsonText)
        _elm.textContent = JSON.stringify(jsonTextParse, null, 2)
      })
    }
    init() {
      this.buetify()
    }
  }
  const buetifyPreJson = new BuetifyPreJson({
    selector: '.pre-json',
  })
  buetifyPreJson.init()
})();
