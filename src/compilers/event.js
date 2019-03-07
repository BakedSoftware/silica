/* global NodeFilter, Silica */

goog.module('compilers.event')

/**
 * @constructor
 * @implements NodeFilter
 */
function EventFilter () {}
EventFilter.prototype.acceptNode = function filter (node) {
  let keys = Object.keys(node.dataset)
  return keys.some(function (key) {
    return key.length >= 3 && key.startsWith('on') &&
      key.charCodeAt(2) <= 90 && key.charCodeAt(2) >= 65
  }) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
}

/** @this Element */
function Event () {
  var nodes = document.createNodeIterator(this, NodeFilter.SHOW_ELEMENT, new EventFilter())
  var node
  while ((node = nodes.nextNode())) {
    node._rt_live = true
    for (let key of Object.keys(node.dataset)) {
      if (key.length >= 3 && key.startsWith('on') &&
        key.charCodeAt(2) <= 90 && key.charCodeAt(2) >= 65) {
        let eventName = key.substr(2).toLowerCase()
        node.addEventListener(eventName, function (evt) {
          Silica._call(this, evt, key)
        })
      }
    }
  }
}

exports = Event
