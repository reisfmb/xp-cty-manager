/**
 * functions initiated with _ are used in other functions
 * functions without _ in the start are exported
 */

// Get all father parents of el
function _getAllElementParents(el: Element): Array<Element> {
  const parents = [];
  do {
    parents.push(el);
  // eslint-disable-next-line no-cond-assign
  } while ((el = el.parentNode as Element));
  return parents;
}

// Check if an element is a vuetify card
function _isElementVCard(el: Element): boolean {
  return (
    (el && el.classList && Array.from(el.classList).indexOf('v-card') >= 0)
    || false
  );
}

///

// For each error elements, find it's Vcard father and colorize it
const colorizeElementsWithErrors = (elements: Array<Element>) => {
  elements.forEach((div: Element) => {
    let el = div;
    while (!_isElementVCard(el) && el.parentElement) {
      el = el.parentElement;
    }
    el.classList.add('v-card-error');
  });

  return elements;
};

// Expand all parent elements of el
const expandAllParentElements = (elements: Array<Element>) => {
  elements.forEach((el) => {
    _getAllElementParents(el)
      .filter((el) => _isElementVCard(el))
      .forEach((el) => {
        // @ts-ignore
        el.__vue__.show = true;
        // @ts-ignore
        el.__vue__.$parent.show = true;
      });
  });
};

// Get all error DOM elements
function getAllDOMelementsWithErrors(): Array<Element> {
  return Array.from(document.getElementsByClassName('v-messages error--text'));
}

function resetVCardErrorClass() {
  Array.from(document.getElementsByClassName('v-card')).forEach((el) => el.classList.remove('v-card-error'));
}

function sanitizeXml(xmlString: string) {
  function _getAllEmptyTagsInXmlString(xmlString: string) {
    // eslint-disable-next-line prefer-regex-literals
    const emptyTags = new RegExp(/<[^/>][^>]*><\/[^>]+>/g);
    return xmlString.match(emptyTags) || [];
  }

  function _getSpecificTagsToBeIgnored() {
    return [
      '</x-data>',
      '</mixin>',
      '</occurrences>',
      '</form>',
      '</options>',
      '</items>',
    ];
  }

  function _getSpecificTagsToBeRemoved() {
    return [
      '<allow-child-content>true</allow-child-content>',
      '<is-abstract>false</is-abstract>',
      '<is-final>false</is-final>',
      '<show-counter>false</show-counter>',
    ];
  }

  function _adjustFormInXmlString(xmlString: string) {
    // eslint-disable-next-line prefer-regex-literals
    const formRegex = new RegExp(/<form>(.*?)<\/form>/g);
    const formString = xmlString.match(formRegex);
    xmlString = xmlString.replace(formRegex, '');
    return xmlString.replace('</content-type>', `${formString}</content-type>`);
  }

  function _finalAdjustments(xmlString: string) {
    xmlString = xmlString.replace(/<config><\/config>/g, '');
    return xmlString.replace(/><\/occurrences>/g, '/>');
  }

  ///

  const specificTags = {
    ignored: _getSpecificTagsToBeIgnored(),
    removed: _getSpecificTagsToBeRemoved(),
  };

  let tagsToBeRemoved = _getAllEmptyTagsInXmlString(xmlString);

  // Ignore specific tag.
  tagsToBeRemoved = tagsToBeRemoved.filter(
    (tagToBeRemoved) => !specificTags.ignored.some(
      (ignoredTag) => tagToBeRemoved.indexOf(ignoredTag) >= 0,
    ),
  );

  // Concat with other specific tags.
  tagsToBeRemoved = tagsToBeRemoved.concat(specificTags.removed);

  // Remove each one of those tags.
  tagsToBeRemoved.forEach((s) => {
    xmlString = xmlString.replace(s, '');
  });

  // Place <form>...</form> as the last thing before ending the cty.
  xmlString = _adjustFormInXmlString(xmlString);

  return _finalAdjustments(xmlString);
}

export {
  colorizeElementsWithErrors,
  expandAllParentElements,
  getAllDOMelementsWithErrors,
  resetVCardErrorClass,
  sanitizeXml,
};
