var ModelWrapper = require('./model');
var utils = require('./utils');

/**
 *
 * Database object.
 * @constructor
 * @param {String} dbName
 * @param {redisClient} client
 * @param {Object} config
 */
function Database(dbName, client, config) {
  this.config = utils.extend({dbName: dbName}, config || {});
  this.Model = ModelWrapper(this, client);
};


module.exports = exports = Database;
