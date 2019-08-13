// kiwi repo: https://github.com/IjzerenHein/kiwi.js/
// Declaring kiwi path as shown on: https://github.com/IjzerenHein/kiwi.js/blob/master/test/main.js
var assert = (typeof window === 'undefined') ? require('assert') : window.chai.assert;
var kiwi = (typeof window === 'undefined') ? require('../corac/kiwi.js') : window.kiwi;

// Create a solver
var solver = new kiwi.Solver();

// Create and add some editable rectangles
// Parent
var pLeft = new kiwi.Variable({ value: 0 });
var pRight = new kiwi.Variable({ value: 800 });
var pWidth = new kiwi.Variable({ value: 800 });
solver.addEditVariable(pLeft, kiwi.Strength.strong);
solver.addEditVariable(pRight, kiwi.Strength.strong);
solver.addEditVariable(pWidth, kiwi.Strength.strong);

// Child A
var aLeft = new kiwi.Variable({ value: 100 });
var aRight = new kiwi.Variable({ value: 300 });
var aWidth = new kiwi.Variable({ value: 200 });
solver.addEditVariable(aLeft, kiwi.Strength.strong);
solver.addEditVariable(aRight, kiwi.Strength.strong);
solver.addEditVariable(aWidth, kiwi.Strength.strong);

// Child B
var bLeft = new kiwi.Variable({ value: 400 });
var bRight = new kiwi.Variable({ value: 700 });
var bWidth = new kiwi.Variable({ value: 300 });
solver.addEditVariable(bLeft, kiwi.Strength.strong);
solver.addEditVariable(bRight, kiwi.Strength.strong);
solver.addEditVariable(bWidth, kiwi.Strength.strong);

// Create a variable calculated through a constraint
// TODO: figure out why some variable values are not present 
//       and whether all variables should be editable? 

// 10 ≤ a.left - p.left 
var aLMinusPLGE = new kiwi.Expression([-1, pLeft], aLeft, -10);
solver.addConstraint(new kiwi.Constraint(aLMinusPLGE, kiwi.Operator.Ge, kiwi.Strength.required));

// a.left - p.left ≤ 10
var aLMinusPLLE = new kiwi.Expression([-1, aLeft], pLeft, 10);
solver.addConstraint(new kiwi.Constraint(aLMinusPLLE, kiwi.Operator.Le, kiwi.Strength.required));

// 10 ≤ b.left - a.right
var bLMinusARGE = new kiwi.Expression(bLeft, [-1, aRight], -10);
solver.addConstraint(new kiwi.Constraint(bLMinusARGE, kiwi.Operator.Ge, kiwi.Strength.required));

// b.left - a.right ≤ 10
var bLMinusARLE = new kiwi.Expression(aRight, [-1, bLeft], 10);
solver.addConstraint(new kiwi.Constraint(bLMinusARLE, kiwi.Operator.Le, kiwi.Strength.required));

// 10 ≤ p.right - b.right
var pRMinusBRGE = new kiwi.Expression(pRight, [-1, bRight], -10);
solver.addConstraint(new kiwi.Constraint(pRMinusBRGE, kiwi.Operator.Ge, kiwi.Strength.required));

// p.right - b.right ≤ 10
var pRMinusBRLE = new kiwi.Expression(bRight, [-1, pRight], 10);
solver.addConstraint(new kiwi.Constraint(pRMinusBRLE, kiwi.Operator.Le, kiwi.Strength.required));

// 20 ≤ a.width 
var aWidthGE = new kiwi.Expression(aWidth, -20);
solver.addConstraint(new kiwi.Constraint(aWidthGE, kiwi.Operator.Ge, kiwi.Strength.required));

// a.width ≤ 20
var aWidthLE = new kiwi.Expression([-1, aWidth], 20);
solver.addConstraint(new kiwi.Constraint(aWidthLE, kiwi.Operator.Le, kiwi.Strength.required));

// 30 ≤ b.width
var bWidthGE = new kiwi.Expression(bWidth, -30);
solver.addConstraint(new kiwi.Constraint(bWidthGE, kiwi.Operator.Ge, kiwi.Strength.required));

// b.width ≤ 30
var bWidthLE = new kiwi.Expression([-1, bWidth], 30);
solver.addConstraint(new kiwi.Constraint(bWidthLE, kiwi.Operator.Le, kiwi.Strength.required));

// Suggest some values to the solver
solver.suggestValue(pLeft, 0);
solver.suggestValue(pRight, 800);
solver.suggestValue(pWidth, 800);

solver.suggestValue(aLeft, 100);
solver.suggestValue(aRight, 300);
solver.suggestValue(aWidth, 200);

solver.suggestValue(bLeft, 400);
solver.suggestValue(bRight, 700);
solver.suggestValue(bWidth, 300);

// Lets solve the problem!
solver.updateVariables();

// Logger 
console.log(" "); 
console.log("Variable Values"); 
console.log(" "); 
console.log("pLeft "+pLeft.value().toString()); 
console.log("pRight "+pRight.value().toString());
console.log("pWidth "+pWidth.value().toString());

console.log("aLeft "+aLeft.value().toString());
console.log("aRight "+aRight.value().toString());
console.log("aWidth "+aWidth.value().toString());

console.log("bLeft "+bLeft.value().toString());
console.log("bRight "+bRight.value().toString());
console.log("bWidth "+bWidth.value().toString());

console.log(" "); 
console.log("Constraint Expressions"); 
console.log(" "); 
console.log("aLMinusPLGE  10 ≤ a.left - p.left  "+aLMinusPLGE.toString()); 
console.log("aLMinusPLLE  a.left - p.left ≤ 10  "+aLMinusPLLE.toString()); 
console.log("bLMinusARGE  10 ≤ b.left - a.right  "+bLMinusARGE.toString()); 
console.log("bLMinusARLE  b.left - a.right ≤ 10  "+bLMinusARLE.toString());  
console.log("pRMinusBRGE  10 ≤ p.right - b.right  "+pRMinusBRGE.toString());  
console.log("pRMinusBRLE  p.right - b.right ≤ 10  "+pRMinusBRLE.toString()); 
console.log("aWidthGE  20 ≤ a.width  "+aWidthGE.toString());  
console.log("aWidthLE  a.width ≤ 20  "+aWidthLE.toString()); 
console.log("bWidthGE  30 ≤ b.width  "+bWidthGE.toString());  
console.log("bWidthLE  b.width ≤ 30  "+bWidthLE.toString());  

console.log(" "); 
console.log(solver);