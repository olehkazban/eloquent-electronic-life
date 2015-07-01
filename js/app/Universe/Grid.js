/**
 * @license eLife 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/eloquent-electronic-life for details
 *
 * Grid: world's grid
 */

define(function(require){
  'use strict';

  var Vector = require('app/Universe/Vector');

  function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
  }

  Grid.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width &&
      vector.y >= 0 && vector.y < this.height;
  };

  Grid.prototype.get = function (vector) {
    return this.space[vector.x + this.width * vector.y];
  };

  Grid.prototype.set = function (vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
  };

  Grid.prototype.forEach = function (f, context) {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var value = this.space[x + y * this.width];
        if (value != null)
          f.call(context, value, new Vector(x, y));
      }
    }
  };

  return Grid;
});