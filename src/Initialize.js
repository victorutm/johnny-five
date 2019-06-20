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

  const Ultrasonic1 = new five.Proximity({
    controller: "HCSR04",
    pin: "A0"
  });

  const Ultrasonic2 = new five.Proximity({
    controller: "HCSR04",
    pin: "A1"
  });

  const sensorHall = new five.Sensor.Digital(2);

  return { left, right, Ultrasonic1, Ultrasonic2, sensorHall };
}

module.exports = initialize;
