const xmlJs = require('/lib/external/xml-js')
const xmlBeautifier = require('../../lib/external/xml-beautifier')

exports.post = req => {

    const executionMode = (JSON.parse(req.body) || {}).mode || {}

    let body = {}

    if(executionMode === 'xml2json'){
        const xml = (JSON.parse(req.body) || {}).xml || {}
        body.json = xmlJs.xml2js(xml)
    }
    else if(executionMode === 'json2xml'){
        const json = (JSON.parse(req.body) || {}).json || {}

        body.xml = xmlBeautifier(xmlJs.js2xml(json))
    }

    return { body, contentType: 'application/json' }

}
