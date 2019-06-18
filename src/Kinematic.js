var five = require("johnny-five");

// set the motor going forward full speed vel_lin=0.3132m/s vel_ang=3.48rad/s vel_ang_motor=15.66 rad/s
function kinematic(linear, angular) {
  const wheelRad = 0.04,
    wheelSep = 0.18;
  var speedLin = linear,
    speedAng = angular,
    angularVelocity = {};
  angularVelocity.right =
    speedLin / wheelRad + (speedAng * wheelSep) / (2 * wheelRad);
  angularVelocity.left =
    speedLin / wheelRad - (speedAng * wheelSep) / (2 * wheelRad);
  angularVelocity = constrain(angularVelocity);
  return angularVelocity;
}

function constrain(angularVelocity) {
  const factor = 255 / 15.66;
  var left, right;
  left = angularVelocity.left;
  right = angularVelocity.right;
  left = parseInt(left * factor, 10);
  right = parseInt(right * factor, 10);
  if (Math.abs(left) > 255) {
    left = 255 * Math.sign(left);
  }
  if (Math.abs(right) > 255) {
    right = 255 * Math.sign(right);
  }
  angularVelocity.left = left;
  angularVelocity.right = right;
  return angularVelocity;
}

module.exports = kinematic;
