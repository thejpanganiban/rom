var ModelWrapper = require('./model');
var utils = require('./utils');
var redis = require('redis');

/**
 *
 * Database object.
 * @constructor {Object} config
 *   {
 *     port: "127.0.0.1",
 *     host: 6739,
 *   }
 */
function Database(userConfig) {
  var redisConfig = {
    host: '127.0.0.1',
    port: 6379
  };
  var config = utils.extend({}, redisConfig, userConfig);
  var client = redis.createClient(config.port, config.host, config);
  this.Model = ModelWrapper(client);
};


module.exports = exports = Database;
