var utils = require('./utils');
var crypto = require('crypto');

/**
 *
 * Base class for models.
 * @constructor {Object} obj
 */
function Model(obj) {
  this.attributes = utils.extend({id: null}, obj || {});
  this.initialize(obj);
};

/**
 *
 * Initialize method. Always called on construct.
 * @param {Object} obj
 */
Model.prototype.initialize = function(obj) {
};

/**
 *
 * Method for subclassing the model.
 * @param {Object} props
 */
Model.extend = function(name, props) {
  var child;
  var parent = this;
  child = function() {
    parent.apply(this, arguments);
  }
  var ctor = function() {};
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  utils.extend(child, parent);
  utils.extend(child.prototype, props);
  child.prototype.constructor = child;
  child.extend = parent.extend;
  child._name = child.prototype._name = name;
  return child;
};

/**
 *
 * Attribute getter.
 * @param {String} attr
 */
Model.prototype.get = function(attr) {
  if (this.attributes.hasOwnProperty(attr)) {
    return this.attributes[attr];
  }
  return undefined;
};

/**
 *
 * Attribute setter.
 * @param {String} attr
 * @param {*} val
 */
Model.prototype.set = function(attr, val) {
  this.attributes[attr] = val;
  return this.attributes[attr];
};

/**
 *
 * Generate ID (Private)
 * @param {Object} obj
 * TODO: Prevent collision. Use uuid
 */
Model.prototype._generateId = function(obj) {
  var hash = crypto.createHash('SHA1');
  for (var key in obj) {
    if (typeof(obj[key]) !== 'function') {
      hash.update(String(obj[key]));
    }
  }
  hash.update(String(new Date().getTime()));
  return hash.digest('hex');
};

/**
 *
 * Concatenates name and id. Thus: <modelName>:<modelId>
 */
Model.key = Model.prototype.key = function(name, id) {
  return name + ":" + id;
};

/**
 *
 * Generate or get the model key: <modelName>:<modelId>
 */
Model.prototype._getKey = function() {
  // Generate an id if it doesn't exist yet.
  if (!this.get('id')) {
    this.set('id', this._generateId(this.attributes));
  }
  return this.key(this._name, this.get('id'));
};

/**
 *
 * Class method find.
 * @param {String} id
 * @param {function(err, model)} callback
 */
Model.find = function(id, callback) {
  var me = this;
  if (!callback) return null;
  if (!id) return callback(new Error("id cannot be undefined."), null);
  this.client.hgetall(this.key(this._name, id), function(err, obj) {
    if (err) return callback(err, null);
    if (!obj) return callback(new Error("Object not found"), obj);
    // Construct model
    callback(err, new me(JSON.parse(obj.attributes)));
  });
};

/**
 *
 * Save model instance from database.
 * @param {function(err, model)} callback
 */
Model.prototype.save = function(callback) {
  var me = this;
  // Persist to redis
  this.client.hset(this._getKey(), "attributes",
      JSON.stringify(this.attributes));
  // Skip callback if no callback is provided. Return current state
  if (!callback) return this;
  // Retrieve the new model instance if calback (Async)
  this.client.hgetall(this._getKey(), function(err, obj) {
    if (err) return callback(err, this);
    if (!obj) return callback(new Error("Object " + this._getKey() + " save failed!"),
      this);
    // Construct model based on stored attributes.
    callback(err, new me.constructor(JSON.parse(obj.attributes)));
  });
};

/**
 *
 * Delete model instance from database.
 * @param {function(err)} callback
 */
Model.prototype.destroy = function(callback) {
  this.client.del(this._getKey(), function(err, obj) {
    if (!callback) return null;
    return callback(err, obj);
  });
};

/**
 *
 * Model Wrapper. Sets the model's redis client
 * @param {Object} client
 */
function ModelWrapper(client) {
  Model.prototype.client = Model.client = client;
  return Model;
};


module.exports = exports = ModelWrapper;
