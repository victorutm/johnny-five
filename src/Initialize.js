var five = require("johnny-five");

function initialize() {
  const right = new five.Motor({
    pins: {
      pwm: 8,
      dir: 9,
      cdir: 10
    }
  });

  const left = new five.Motor({
    pins: {
      pwm: 11,
      dir: 12,
      cdir: 13
    }
  });

  const sensor00 = new five.Proximity({
    controller: "HCSR04",
    pin: "A0"
  });

  const sensor01 = new five.Proximity({
    controller: "HCSR04",
    pin: "A1"
  });

  const sensor10 = new five.Proximity({
    controller: "HCSR04",
    pin: "A2"
  });

  const sensor11 = new five.Proximity({
    controller: "HCSR04",
    pin: "A3"
  });

  return { left, right, sensor00, sensor01, sensor10, sensor11 };
}

module.exports = initialize;

// y cuando lo ocupas haces
// import {leftMotor, rightMotor} from 'config';
