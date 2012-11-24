
/**
 *
 * A collection of utilities
 */
var utils = {

  /**
   *
   * A simple extend function
   * @param {Object} dest
   * @param {*} sources
   */
  extend: function(obj) {
    var sources = Array.prototype.slice.call(arguments, 1);
    for (var source in sources) {
      for (var prop in sources[source]) {
        obj[prop] = sources[source][prop];
      }
    }
    return obj;
  },

  /**
   *
   * Generate the current timestamp
   */
  newTimestamp: function() {
    return Math.round(new Date().getTime() / 1000);
  }
};

module.exports = exports = utils;
