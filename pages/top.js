const I = actor();

module.exports = {
  fields: {
    search_input: 'input.header-search-input'
  },
  search(string) {
    I.click(this.fields.search_input)
    I.fillField(this.fields.search_input, string)
    I.pressKey('Enter')
  }
}
