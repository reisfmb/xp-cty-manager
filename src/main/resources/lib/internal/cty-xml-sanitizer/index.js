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

    // After removing, there might be empty config tags. Remove them if there are.
    xmlString = xmlString.replaceAll('<config></config>', '');

    // Place <form>...</form> as the last thing before ending the cty.
    xmlString = adjustFormInXmlString(xmlString);

    return xmlString;
}

const getAllEmptyTagsInXmlString = xmlString => {
    const emptyTags = new RegExp(/<[^/>][^>]*><\/[^>]+>/g);
    return xmlString.match(emptyTags);
}

const getSpecificTagsToBeIgnored = () => [
    '</x-data>',
    '</mixin>',
    '</occurrences>',
    '</form>'
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

module.exports = { sanitize };
