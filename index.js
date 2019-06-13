var five = require("johnny-five"),
  board = new five.Board();

function printime(state){
  const date= new Date();
  console.log(state);
  console.log(date.getSeconds());
}

board.on("ready", function() {
  var motor;

  motor = new five.Motor({
    pins: {
      pwm: 8,
      dir: 9
    }
  });

  board.repl.inject({
    motor: motor
  });

  motor.on("start", function() {
    printime("start");
  });

  motor.on("stop", function() {
    printime("automated stop on timer");
  });

  motor.on("forward", function() {
    printime("forward");

    // demonstrate switching to reverse after 5 seconds
    board.wait(5000, function() {
      motor.reverse(255);
    });
  });

  motor.on("reverse", function() {
    printime("reverse");

    // demonstrate stopping after 5 seconds
    board.wait(5000, function() {
      motor.stop();
    });
  });

  // set the motor going forward full speed
  motor.forward(255);
});

console.log("\nEsperando a que inicialice el dispositivo...");
