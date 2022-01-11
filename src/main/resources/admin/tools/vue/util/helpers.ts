// Get all father parents of el
function _getAllElementParents(el: Element): Array<Element> {
  const parents = [];
  do {
    parents.push(el);
  } while ((el = el.parentNode as Element));
  return parents;
}

// Check if an element is a vuetify card
function _isElementVCard(el: Element): boolean {
  return (
    (el && el.classList && Array.from(el.classList).indexOf("v-card") >= 0) ||
    false
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
    el.classList.add("v-card-error");
  });

  return elements;
};

// Expand all parent elements of el
const expandAllParentElements = (elements: Array<Element>) => {
  elements.forEach((el) => {
    _getAllElementParents(el)
      .filter((el) => _isElementVCard(el))
      .forEach((el) => {
        //@ts-ignore
        el.__vue__.show = true;
        //@ts-ignore
        el.__vue__.$parent.show = true;
      });
  });
};

// Get all error DOM elements
function getAllDOMelementsWithErrors(): Array<Element> {
  return Array.from(document.getElementsByClassName("v-messages error--text"));
}

function resetVCardErrorClass() {
  Array.from(document.getElementsByClassName("v-card")).forEach((el) =>
    el.classList.remove("v-card-error")
  );
}

export {
  colorizeElementsWithErrors,
  expandAllParentElements,
  getAllDOMelementsWithErrors,
  resetVCardErrorClass,
};
