/**
 * Gets 'data-*' property.
 * See https://bugs.webkit.org/show_bug.cgi?id=161454
 */
function getDatasetProperty(dataset, propName) {
    return dataset == null ? null : typeof Reflect !== 'undefined' ? Reflect.get(dataset, propName) : dataset[propName];
}
/**
 * @param {Object} dataset
 * @param {string} propName
 * @return {boolean}
 */
function hasDatasetProperty(dataset, propName) {
    return dataset == null ? false : typeof Reflect !== 'undefined' ? Reflect.has(dataset, propName) : dataset[propName];
}

export default {
  getDatasetProperty: getDatasetProperty,
  hasDatasetProperty: hasDatasetProperty
}
