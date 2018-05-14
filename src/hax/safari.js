goog.module('hax.safari')
/**
 * Gets 'data-*' property.
 * See https://bugs.webkit.org/show_bug.cgi?id=161454
 */
function getDatasetProperty (element, propName) {
  if (element.dataset && typeof element.dataset !== 'undefined' && element.dataset[propName]) {
    return element.dataset[propName]
  }
  if (typeof Reflect !== 'undefined') {
    let dataset = Reflect.get(element, 'dataset')
    if (dataset) {
      let value = Reflect.get(new Object(dataset), propName)
      if (value) {
        return value
      }
    }
  }

  return element.getAttribute('data-' + propName)
}
/**
 * @param {Element} element
 * @param {string} propName
 * @return {boolean}
 */
function hasDatasetProperty (element, propName) {
  return !!getDatasetProperty(element, propName)
}

exports.getDatasetProperty = getDatasetProperty
exports.hasDatasetProperty = hasDatasetProperty
