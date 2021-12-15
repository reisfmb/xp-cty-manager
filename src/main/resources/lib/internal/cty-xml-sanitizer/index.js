const sanitize = (xmlString) => {    
    [
        '<allow-child-content>true</allow-child-content>',
        '<is-abstract>false</is-abstract>',
        '<is-final>false</is-final>'
    ].forEach(s => xmlString = xmlString.replace(s, ''))

    return xmlString;
}

module.exports = { sanitize };
