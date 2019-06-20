var kinematic = require("./Kinematic");
var five = require("johnny-five"),
  board = new five.Board();

function printime(state) {
  const date = new Date();
  console.log(state);
  console.log(date.getSeconds());
}

board.on("ready", function() {
  const init = require("./Initialize")();
  const leftMotor = init.left;
  const rightMotor = init.right;
  const frontSensor = init.Ultrasonic1;
  const sensorHAll = init.sensorHall;
  board.repl.inject({
    leftMotor: leftMotor,
    rightMotor: rightMotor
  });

  frontSensor.on("data", function() {
    const pwm = kinematic(0.3132, 3.48);
    leftMotor.forward(pwm.left);
    board.wait(5000, function() {
      leftMotor.reverse(pwm.left);
    });
    console.log(" pwm : ", pwm.left);
    console.log("  cm  : ", this.cm);
    console.log("-----------------");
  });
});

console.log("\nEsperando a que inicialice el dispositivo...");
