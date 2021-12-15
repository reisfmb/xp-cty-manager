const xmlJs = require('/lib/external/xml-js')
const xmlBeautifier = require('../../lib/external/xml-beautifier')
const ctyXmlSanitizer = require('../../lib/internal/cty-xml-sanitizer')

exports.post = req => {

    const executionMode = (JSON.parse(req.body) || {}).mode || {}

    let body = {}

    if(executionMode === 'xml2json'){
        const xml = (JSON.parse(req.body) || {}).xml || {}
        body.json = xmlJs.xml2js(xml)
    }
    else if(executionMode === 'json2xml'){
        const json = (JSON.parse(req.body) || {}).json || {}

        let xml = xmlJs.js2xml(json)
        xml = ctyXmlSanitizer.sanitize(xml)
        xml = xmlBeautifier(xml)
        
        body.xml = xml
    }

    return { body, contentType: 'application/json' }

}
