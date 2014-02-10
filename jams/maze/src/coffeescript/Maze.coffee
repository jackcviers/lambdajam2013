_ = require 'underscore'

{growingTree} = require './mazeAlgorithms.coffee'
width = (Math.round Math.random() * (5 - 1)) + 1
height = width

console.log JSON.stringify growingTree width, height
