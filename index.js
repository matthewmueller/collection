
/**
 * Module dependencies.
 */

var Enumerable = require('enumerable'),
    Emitter = require('emitter');

/**
 * Expose `Collection`.
 */

module.exports = Collection;

/**
 * Initialize a new collection with the given `models`.
 *
 * @param {Array} models
 * @api public
 */

function Collection(models) {
  this.models = models || [];
}

/**
 * Mixin enumerable.
 */

Enumerable(Collection.prototype);

/**
 * Mixin emitter
 */

Emitter(Collection.prototype);

/**
 * Iterator implementation.
 */

Collection.prototype.__iterate__ = function(){
  var self = this;
  return {
    length: function(){ return self.length() },
    get: function(i){ return self.models[i] }
  }
};

/**
 * Return the collection length.
 *
 * @return {Number}
 * @api public
 */

Collection.prototype.length = function(){
  return this.models.length;
};

/**
 * Removes the last element from an array and returns that element
 *
 * @return {Mixed} removed element
 */

Collection.prototype.pop = function() {
  var models = this.models,
      ret = models.pop.apply(models, arguments);
  this.emit('pop', ret);
  this.emit('remove', ret);
  return ret;
};

/**
 * Push a value onto the end of the array,
 * returning the length of the array
 *
 * @param {Mixed, ...} elements
 * @return {Number}
 */

Collection.prototype.push = function() {
  var models = this.models,
      ret = models.push.apply(models, arguments),
      args = [].slice.call(arguments);
  this.emit('push', ret);
  for(var i = 0, len = args.length; i < len; i++) this.emit('add', args[i]);
  return ret;
};

/**
 * Reverses an array in place.
 *
 * @return {Array}
 */

Collection.prototype.reverse = function() {
  var models = this.models,
      ret = models.reverse.apply(models, arguments);
  this.emit('reverse', ret);
  return ret;
};

/**
 * Removes the first element from an array and returns that element.
 *
 * @return {Mixed}
 */

Collection.prototype.shift = function() {
  var models = this.models,
      ret = this.models.shift.apply(this, arguments);
  this.emit('shift', ret);
  this.emit('remove', ret);
  return ret;
};

/**
 * Sorts the elements of an array.
 *
 * @return {Array}
 */

Collection.prototype.sort = function() {
  var models = this.models,
      ret = models.sort.apply(models, arguments);
  this.emit('sort', ret);
  return ret;
};

/**
 * Adds and/or removes elements from an array.
 *
 * @param {Number} index
 * @param {Number} howMany
 * @param {Mixed, ...} elements
 * @return {Array} removed elements
 */

Collection.prototype.splice = function() {
  var models = this.models,
      ret = models.splice.apply(models, arguments),
      added = [].slice.call(arguments, 2);
  this.emit('splice', ret);
  for(var i = 0, len = ret.length; i < len; i++) this.emit('remove', ret[i]);
  for(    i = 0, len = added.length; i < len; i++) this.emit('add', added[i]);
  return ret;
};

/**
 * Adds one or more elements to the front of an array
 * and returns the new length of the array.
 *
 * @param {Mixed, ...} elements
 * @return {Number} length
 */

Collection.prototype.unshift = function() {
  var models = this.models,
      ret = models.unshift.apply(models, arguments),
      args = [].slice.call(arguments);
  this.emit('unshift', ret);
  for(var i = 0, len = args.length; i < len; i++) this.emit('add', args[i]);
  return ret;
};

/**
 * Clear a list
 *
 * @return {Collection}
 */

Collection.prototype.clear = function() {
  this.models = [];
  this.emit('clear');
  return this;
};
