goog.module('silica.pubsub')

var subscriptions = new Map() // map[channel] => map[int]=>handler
var subscriptionID = 1
var subscriptionSeparator = '[--+--]'

function nextSubscriptionID () {
  return (subscriptionID++)
}

function sub (channel, handler, context = document) {
  let subs = subscriptions.get(channel)
  if (!subs) {
    subs = new Map()
    subscriptions.set(channel, subs)
  }
  let id = nextSubscriptionID()
  subs.set(id, [handler, context])
  return `${channel}${subscriptionSeparator}${id}`
}

function pub (channel, ...args) {
  let subs = subscriptions.get(channel)
  if (subs) {
    setTimeout(function () {
      for (let [_, value] of subs) {
        Silica.enqueue(function () {
          value[0](...args)
        }, value[1])
      }
    }, 0)
  }
}

function unsub (subscriptionID) {
  let [channel, id] = subscriptionID.split(subscriptionSeparator)
  let subs = subscriptions.get(channel)
  if (subs) {
    subs.delete(parseInt(id, 10))
    if (subs.size === 0) {
      subscriptions.delete(channel)
    }
  }
}

exports.Pub = pub
exports.Sub = sub
exports.Unsub = unsub
