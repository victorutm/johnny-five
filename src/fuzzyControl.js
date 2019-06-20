var fuzzylogic = require("../node_modules/fuzzylogic/lib/fuzzylogic");
var rules = require("../node_modules/fuzzylogic/lib/rules");

var pwmCalc = function(distance, speed) {
  var probabProhibited = fuzzylogic.reverseGrade(distance, 2, 16);
  var probabVeryNear = fuzzylogic.triangle(distance, 14, 32, 50);
  var probabNear = fuzzylogic.triangle(distance, 30, 65, 100);
  var probabHalf = fuzzylogic.triangle(distance, 80, 120, 160);
  var probabFar = fuzzylogic.triangle(distance, 150, 170, 190);
  var probabVeryFar = fuzzylogic.grade(distance, 175, 230);

  var probabSlow = fuzzylogic.reverseGrade(speed, 60, 100);
  var probabMedium = fuzzylogic.triangle(speed, 80, 100, 120);
  var probabHigh = fuzzylogic.triangle(speed, 100, 120, 140);
  var probabXtreme = fuzzylogic.grade(speed, 140, 160);

  return {
    prohibited: probabProhibited,
    veryNear: probabVeryNear,
    near: probabNear,
    half: probabHalf,
    far: probabFar,
    veryFar: probabVeryFar,
    slow: probabSlow,
    medium: probabMedium,
    high: probabHigh,
    xtreme: probabXtreme
  };
};

var res = pwmCalc(40, 60);
console.log("prohibited :", res.prohibited);
console.log("verynear :", res.veryNear);
console.log("near :", res.near);

var resAnd = rules.and(
  0.1,
  0.2,
  function() {
    console.log("callBack A in rule and");
  },
  function() {
    console.log("callBack B in rule and");
  }
);

var resOr = rules.or(
  0.1,
  0.2,
  function() {
    console.log("callBack A in rule or");
  },
  function() {
    console.log("callBack B in rule or");
  }
);

var resNot = rules.not(0.1);
