const sanitize = (xmlString) => {
    const specificTags = {
        ignored: getSpecificTagsToBeIgnored(),
        removed: getSpecificTagsToBeRemoved()
    };

    let tagsToBeRemoved = getAllEmptyTagsInXmlString(xmlString);
    
    // Ignore specific tag
    tagsToBeRemoved = tagsToBeRemoved.filter(tagToBeRemoved => !specificTags.ignored.some(ignoredTag => tagToBeRemoved.indexOf(ignoredTag) >= 0));

    // Concat with other specific tags
    tagsToBeRemoved = tagsToBeRemoved.concat(specificTags.removed);

    // Remove each one of those tags
    tagsToBeRemoved.forEach(s => {xmlString = xmlString.replace(s, ''); log.info(xmlString + '\n\n')});

    // After removing, there might be empty config tags. Remove them if there are.
    xmlString = xmlString.replaceAll('<config></config>', '');

    return xmlString;
}

const getAllEmptyTagsInXmlString = xmlString => {
    const emptyTags = new RegExp(/<[^/>][^>]*><\/[^>]+>/g);
    return xmlString.match(emptyTags);
}

const getSpecificTagsToBeIgnored = () => [
    '</occurrences>',
    '</form>'
];

const getSpecificTagsToBeRemoved = () => [
    '<allow-child-content>true</allow-child-content>',
    '<is-abstract>false</is-abstract>',
    '<is-final>false</is-final>',
    '<show-counter>false</show-counter>'
];

module.exports = { sanitize };
