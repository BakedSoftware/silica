goog.module("watchers.observer");
const Show = goog.require("compilers.show");

let IO = null;

if (typeof window.IntersectionObserver === "undefined") {
  IO = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe(node) {
      this.callback([{ target: node, isIntersecting: true }]);
    }
    unobserve(node) {
      // NO-OP
    }
  };
} else {
  IO = window.IntersectionObserver;
}

class ValueObserver {
  constructor() {
    this.mapping = new Map();
    this.liveNodes = new Set();
    this.hiddenNodes = new Set();
    this.visibilityObserver = new IO((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.liveNodes.add(entry.target);
          this.hiddenNodes.delete(entry.target);
        } else {
          this.liveNodes.delete(entry.target);
          if (entry.target.classList.contains("hidden")) {
            this.hiddenNodes.add(entry.target);
          }
        }
      });
      this.applyChanges();
    });
  }

  clone(obj) {
    if (obj === null || obj === undefined) {
      return null;
    }

    if (typeof obj !== "object" || obj instanceof Date) {
      return obj;
    }

    try {
      var clone = new obj.constructor();
      for (var key in obj) {
        if (!key.startsWith("_")) {
          if (obj[key] != null && typeof obj[key] === "object") {
            clone[key] = this.clone(obj[key]);
          } else {
            clone[key] = obj[key];
          }
        }
      }
      return clone;
    } catch (e) {
      throw new Error(`Error while cloning object: ${JSON.stringify(obj)} - msg: ${e.message}`);
    }
  }

  removeSubTree(tree) {
    this.hiddenNodes.forEach((node) => {
      if (Silica.isChildOf(node, tree)) {
        this.deregister(node);
      }
    });
    this.liveNodes.forEach((node) => {
      if (Silica.isChildOf(node, tree)) {
        this.deregister(node);
      }
    });
    this.deregister(tree);
  }

  deregister(node, property = null, actor = null) {
    /* global Element */
    if (node instanceof Element) {
      this.visibilityObserver.unobserve(node);
    }
    let map = this.mapping.get(node);

    if (!map) {
      return;
    }

    if (!property && !actor) {
      this.liveNodes.delete(node);
      this.hiddenNodes.delete(node);
      this.mapping.delete(node);
    }

    let packet = map.get(property);
    if (packet) {
      packet.actors.delete(actor);
    }
  }

  register(node, property, actor, set = true) {
    let [filtered, raw, paramKeys] = Silica.getFilteredValue(node, property);
    let value = this.clone(raw);
    let map = this.mapping.get(node);

    if (!map) {
      map = new Map();
      this.mapping.set(node, map);
      if (node.nodeName === "OPTION") {
        this.liveNodes.add(node);
      } else {
        this.visibilityObserver.observe(node);
      }
    }

    let packet = map.get(property);
    if (!packet) {
      packet = {
        value: set ? value : null,
        actors: new Set([actor]),
        params: paramKeys,
      };
      map.set(property, packet);
    } else {
      packet.actors.add(actor);
    }
    actor.call(node, null, set ? filtered : null);
    // TODO: Add listener for DOM removal and deregister

    return filtered;
  }

  applyChanges(scope = null) {
    this.hiddenNodes.forEach((node) => {
      if (!scope || node === scope || Silica.isChildOf(node, scope)) {
        let mapping = this.mapping.get(node);
        if (mapping) {
          mapping.forEach((packet, property) => {
            if (packet.actors.has(Show)) {
              let result = Silica.getFilteredValue(
                node,
                property,
                packet.value,
                packet.params
              );
              if (result && !Object.is(packet.value, result[1])) {
                Show.call(node, null, result[0]);
                this.liveNodes.add(node);
              }
            }
          });
        }
      }
    });

    this.liveNodes.forEach((node) => {
      if (!scope || node === scope || Silica.isChildOf(node, scope)) {
        let mapping = this.mapping.get(node);
        if (mapping) {
          mapping.forEach((packet, property) => {
            let result = Silica.getFilteredValue(
              node,
              property,
              packet.value,
              packet.params
            );
            if (result && !Object.is(packet.value, result[1])) {
              packet.value = this.clone(result[1]);
              for (let actor of packet.actors.values()) {
                actor.call(node, null, result[0]);
              }
            }
          });
        }
      }
    });
  }
}

exports = ValueObserver;
