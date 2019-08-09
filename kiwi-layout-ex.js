// kiwi repo: https://github.com/IjzerenHein/kiwi.js/
// Declaring kiwi path as shown on: https://github.com/IjzerenHein/kiwi.js/blob/master/test/main.js
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var kiwi = (typeof window === 'undefined') ? require('../corac/kiwi.js') : window.kiwi;

// Create a solver
var solver = new kiwi.Solver();

// Create and add some editable variables
var left = new kiwi.Variable();
var width = new kiwi.Variable();
solver.addEditVariable(left, kiwi.Strength.strong);
solver.addEditVariable(width, kiwi.Strength.strong);

// Create a variable calculated through a constraint
var centerX = new kiwi.Variable();
var expr = new kiwi.Expression([-1, centerX], left, [0.5, width]);
solver.addConstraint(new kiwi.Constraint(expr, kiwi.Operator.Eq, kiwi.Strength.required));

// Suggest some values to the solver
solver.suggestValue(left, 0);
solver.suggestValue(width, 500);

// Lets solve the problem!
solver.updateVariables();
assert(centerX.value(), 250);

// Logger 
console.log("left "+left.toString());

console.log("width "+width.toString());

console.log("centerX "+centerX.toString());

console.log("expr "+expr.toString());

console.log(solver);