//World

define([
  'app/Universe/Grid',
  'app/Universe/Vector',
  'app/helperElements/charFromElement',
  'app/helperElements/elementFromChar',
  'app/Universe/View',
  'app/Universe/directions'
], function (Grid, Vector, charFromElement, elementFromChar, View, directions) {
  'use strict';

  function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function (line, y) {
      for (var x = 0; x < line.length; x++) {
        grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
      }
    });
  }

  World.prototype.toString = function () {
    var output = '';
    for (var y = 0; y < this.grid.height; y++) {
      for (var x = 0; x < this.grid.width; x++) {
        var element = this.grid.get(new Vector(x, y));
        output += charFromElement(element);
      }
      output += '\n';
    }
    return output;
  };

  World.prototype.turn = function () {
    var acted = [];
    this.grid.forEach(function (critter, vector) {
      if (critter.act && acted.indexOf(critter) == -1) {
        acted.push(critter);
        this.letAct(critter, vector);
      }
    }, this);
  };

  World.prototype.letAct = function (critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == 'move') {
      var destination = this.checkDestination(action, vector);
      if (destination && this.grid.set(destination) == null) {
        this.grid.set(vector, null);
        this.grid.set(destination, critter);
      };
    };
  };

  World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var destination = vector.plus(directions[action.direction]);
      if (this.grid.isInside(destination))
        return destination;
    }
  };

  return World;
});