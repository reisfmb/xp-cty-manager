const rawSchemas = require('./raw-schemas')
const xmlJs = require('/lib/external/xml-js')

exports.get = req => {

    const schemaName = (req.params || {}).schemaName || {}
    
    const json = xmlJs.xml2js(rawSchemas[schemaName])

    return {
        body: { json },
        contentType: 'application/json'
    }
}