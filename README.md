# react-lights-out
Lights out game built with React

Only includes 3 components: App, Board, Cell

App - renders game
Board - builds the board based on props, has state and passes down function into Cell. Takes in 3 props :num rows, num columns, and chance light is on.
Cell - only has 2 props: the passed down function and boolean

Objective: Turn off all lights. Once all lights are off, board is replaced with winning message.
