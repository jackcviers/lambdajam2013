(function() {
  var growingTree, height, width, _;

  _ = require('underscore');

  growingTree = require('./mazeAlgorithms.coffee').growingTree;

  width = (Math.round(Math.random() * (5 - 1))) + 1;

  height = width;

  console.log(JSON.stringify(growingTree(width, height)));

}).call(this);

(function() {
  var MazeAlgorithms, carve, fetchNeighbors, genFilledMaze, growIteratively, isOpen, isValid, _;

  _ = require('underscore');

  genFilledMaze = function(width, height) {
    return _.times(height, (function() {
      return _.times(width, function() {
        return 0;
      });
    }));
  };

  isValid = function(width, height) {
    return function(rowCol) {
      var col, row;
      row = rowCol[0], col = rowCol[1];
      return (0 <= row && row < width) && (0 <= col && col < height);
    };
  };

  isOpen = function(maze) {
    return function(rowCol) {
      return maze[_.head(rowCol)][_.last(rowCol)] === 0;
    };
  };

  carve = function(rowCol, maze) {
    var newMaze, opening;
    opening = (Math.round(Math.random() * 15 - 1)) + 1;
    newMaze = _.clone(maze);
    newMaze[_.head(rowCol)][_.last(rowCol)] = opening;
    return [rowCol, newMaze];
  };

  fetchNeighbors = function(rowCol, width, height) {
    var col, east, north, row, south, west;
    row = rowCol[0], col = rowCol[1];
    if (row > width) {
      row = width;
    }
    if (col > height) {
      col = height;
    }
    north = [row - 1, col];
    south = [row + 1, col];
    east = [row, col + 1];
    west = [row, col - 1];
    return _.filter([north, east, south, west], isValid(width, height));
  };

  growIteratively = function(maze, width, height) {
    var cols, rows, strangeLoop, _i, _j, _results, _results1;
    strangeLoop = function(carved, maze) {
      var candidates, carvedElement, e, n, newMaze, _ref;
      carved || (carved = []);
      if (carved.length === 0) {
        return maze;
      } else {
        e = _.head(carved);
        n = fetchNeighbors(e, width, height);
        candidates = _.filter(n, isOpen(maze));
        if (_.isEmpty(candidates)) {
          return strangeLoop(_.tail(carved), maze);
        } else {
          _ref = carve(_.head(candidates), maze), carvedElement = _ref[0], newMaze = _ref[1];
          return strangeLoop(_.tail(carved), newMaze);
        }
      }
    };
    rows = (function() {
      _results = [];
      for (var _i = 0; 0 <= width ? _i <= width : _i >= width; 0 <= width ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
    cols = (function() {
      _results1 = [];
      for (var _j = 0; 0 <= height ? _j <= height : _j >= height; 0 <= height ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this);
    return strangeLoop((_.zip(rows, cols)).join(_.zip(_.reverse(rows), cols)), maze);
  };

  MazeAlgorithms = {
    growingTree: function(width, height) {
      var maze;
      maze = genFilledMaze(width, height);
      return growIteratively(maze, width, height);
    }
  };

  module.exports = MazeAlgorithms;

}).call(this);
