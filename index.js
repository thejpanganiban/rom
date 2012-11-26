var Database = require('./lib/db');
var Model = require('./lib/model');
var utils = require('./lib/utils');

/**
 *
 * Module Object.
 */
var rom = {
  /**
   *
   * Creates a database instance
   * @param {String} name
   * @param {redisClient} client
   */
  createDatabase: function(name, client) {
    // Create client instance if no client is provided.
    if (!client) {
      // Require redis at this point. Use user redis.
      var redis = require('redis');
      client = redis.createClient();
    }
    return new Database(name, client);
  },

  /**
   *
   * Convinience property for accessing the Database object
   */
  Database: Database,

  /**
   *
   * Convinience property for accessing the Model object
   */
  Model: Model,

  /**
   *
   * Convinience property for accessing the utility library
   */
  utils: utils
};


module.exports = exports = rom;
