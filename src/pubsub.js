goog.module('silica.pubsub');

var subscriptions = new Map(); //map[channel] => map[int]=>handler
var subscription_id = 1;
var subscription_separator = "[--+--]"

function next_subscription_id() {
  return (subscription_id++);
}

function sub(channel, handler) {
  let subs = subscriptions.get(channel);
  if (!subs)
  {
    subs = new Map();
    subscriptions.set(channel, subs);
  }
  let id = next_subscription_id();
  subs.set(id, handler);
  return `${channel}${subscription_separator}${id}`;
}

function pub(channel, ...args) {
  let subs = subscriptions.get(channel);
  if (subs)
  {
    setTimeout(function()
    {
      Silica.apply(function()
      {
        for (let [_, value] of subs)
        {
          value(...args);
        }
      });
    }, 0);
  }
}

function unsub(subscription_id) {
  let [channel, id] = subscription_id.split(subscription_separator);
  let subs = subscriptions.get(channel);
  if (subs)
  {
    subs.delete(parseInt(id, 10));
    if (subs.size === 0)
    {
      subscriptions.delete(channel);
    }
  }
}

exports.Pub    =  pub;
exports.Sub    =  sub;
exports.Unsub  =  unsub;
