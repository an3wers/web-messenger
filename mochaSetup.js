// eslint-disable-next-line import/no-extraneous-dependencies
const { JSDOM } = require('jsdom')
const Handlebars = require('handlebars')
const fs = require('fs')

const { window } = new JSDOM('<div id="root"></div>', {
  url: 'http://localhost:3000'
})

global.window = window
global.document = window.document
global.DocumentFragment = window.DocumentFragment
global.FormData = window.FormData
// global.setTimeout = window.setTimeout

require.extensions['.hbs'] = (module, filename) => {
  const contents = fs.readFileSync(filename, 'utf-8')

  module.exports = Handlebars.compile(contents)
}
