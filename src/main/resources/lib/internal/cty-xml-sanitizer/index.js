const sanitize = (xmlString) => {
    const specificTags = {
        ignored: getSpecificTagsToBeIgnored(),
        removed: getSpecificTagsToBeRemoved()
    };

    let tagsToBeRemoved = getAllEmptyTagsInXmlString(xmlString);
    
    // Ignore specific tag.
    tagsToBeRemoved = tagsToBeRemoved.filter(tagToBeRemoved => !specificTags.ignored.some(ignoredTag => tagToBeRemoved.indexOf(ignoredTag) >= 0));

    // Concat with other specific tags.
    tagsToBeRemoved = tagsToBeRemoved.concat(specificTags.removed);

    // Remove each one of those tags.
    tagsToBeRemoved.forEach(s => { xmlString = xmlString.replace(s, '') });

    // Place <form>...</form> as the last thing before ending the cty.
    xmlString = adjustFormInXmlString(xmlString);

    return finalAdjustments(xmlString);
}

const getAllEmptyTagsInXmlString = xmlString => {
    const emptyTags = new RegExp(/<[^/>][^>]*><\/[^>]+>/g);
    return xmlString.match(emptyTags);
}

const getSpecificTagsToBeIgnored = () => [
    '</x-data>',
    '</mixin>',
    '</occurrences>',
    '</form>',
    '</options>',
    '</items>'
];

const getSpecificTagsToBeRemoved = () => [
    '<allow-child-content>true</allow-child-content>',
    '<is-abstract>false</is-abstract>',
    '<is-final>false</is-final>',
    '<show-counter>false</show-counter>'
];

const adjustFormInXmlString = (xmlString) => {
    const formRegex = new RegExp(/<form>(.*?)<\/form>/g);
    const formString = xmlString.match(formRegex);
    xmlString = xmlString.replace(formString, '');
    return xmlString.replace('</content-type>', formString + '</content-type>');
}

const finalAdjustments = (xmlString) => {
    xmlString = xmlString.replaceAll('<config></config>', '');
    return xmlString.replaceAll('></occurrences>', '/>');
}

module.exports = { sanitize };
