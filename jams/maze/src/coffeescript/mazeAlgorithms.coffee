_ = require 'underscore'

genFilledMaze = (width, height)-> _.times height, (-> _.times width, -> 0)
# int -> int -> (row, col) -> Boolean
isValid = (width, height) -> (rowCol) ->
  [row, col] = rowCol
  0 <= row < width  and 0 <= col < height

# Maze -> (row, col) -> Boolean
isOpen = (maze) -> (rowCol) ->
  maze[_.head rowCol][_.last rowCol] is 0

carve = (rowCol, maze) ->
  opening = (Math.round (Math.random() * 15 - 1)) + 1
  newMaze = _.clone maze
  newMaze[_.head rowCol][_.last rowCol] = opening
  [rowCol, newMaze]

#(row, col) -> [(row, col)]
fetchNeighbors = (rowCol, width, height) ->
  [row, col] = rowCol
  row = width if row > width
  col = height if col > height
  north = [row - 1, col]
  south = [row + 1, col]
  east = [row, col + 1]
  west = [row, col - 1]
  _.filter [north, east, south, west], isValid(width, height)

growIteratively = (maze, width, height) ->
  strangeLoop = (carved, maze) ->
    carved or= []
    if carved.length is 0
      maze
    else
      e = _.head carved
      n = fetchNeighbors e, width, height
      candidates = _.filter n, isOpen(maze)
      if _.isEmpty candidates
        strangeLoop((_.tail carved), maze)
      else
        [carvedElement, newMaze] = carve((_.head candidates), maze)
        strangeLoop (_.tail carved), newMaze

  rows = [0..width]
  cols = [0..height]
  reverse = _.zip( rows, _.clone(cols).reverse())
  reverseCols = _.zip(_.clone(rows).reverse(), cols)
  reverseRowsAndCols = _.zip(_.clone(rows).reverse(), _.clone(cols).reverse())
  console.log _.zip(rows, cols).concat(reverse, reverseCols, reverseRowsAndCols)
  
  strangeLoop _.zip(rows, cols).concat(reverse, reverseCols, reverseRowsAndCols), maze
    
     
  
  

MazeAlgorithms =
  growingTree: (width, height)  ->
    maze = genFilledMaze(width, height)
    growIteratively(maze, width, height)
    
    
module.exports = MazeAlgorithms
