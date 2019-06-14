var five = require("johnny-five"),
  board = new five.Board();

const wheel_rad=0.04,
      wheel_sep=0.18;

function printime(state){
  const date= new Date();
  console.log(state);
  console.log(date.getSeconds());
}

function kinematic(linear,angular){
  var speed_lin=linear;
  var speed_ang=angular;
  var angular_velocity = {};
  angular_velocity.right=(speed_lin/wheel_rad)+((speed_ang*wheel_sep)/(2*wheel_rad));
  angular_velocity.left=(speed_lin/wheel_rad)-((speed_ang*wheel_sep)/(2*wheel_rad));
  return angular_velocity;
}

board.on("ready", function() {
  var motor_left;
  var motor_right;
  var proximity;

  proximity = new five.Proximity({
    controller: "HCSR04",
    pin : "A0"
  });

  motor_right = new five.Motor({
    pins: {
      pwm:  8,
      dir:  9,
      cdir: 10
    }
  });

  motor_left = new five.Motor({
    pins: {
      pwm:  11,
      dir:  12,
      cdir: 13 
    }
  });

  board.repl.inject({
    motor_left: motor_left,
    motor_right: motor_right
  });

  motor_left.on("start", function() {
    printime("start");
  });

  motor_left.on("stop", function() {
    printime("automated stop on timer");
  });

  motor_left.on("forward", function() {
    printime("forward");
    console.log("Velocity:",angular_velocity.left);

    // demonstrate switching to reverse after 5 seconds
    board.wait(5000, function() {
      motor_left.reverse(angular_velocity.left);
    });
  });

  motor_left.on("reverse", function() {
    printime("reverse");
    console.log("Velocity:",angular_velocity.left);

    // demonstrate stopping after 5 seconds
    board.wait(5000, function() {
      //motor_left.stop();
      motor_left.forward(angular_velocity.left);
    });
  });

  proximity.on("data", function() {
    console.log("Proximity: ");
    console.log("  cm  : ", this.cm);
    console.log("  in  : ", this.in);
    console.log("-----------------");
  });

 /* proximity.on("change", function() {
    console.log("The obstruction has moved.");
  });
*/
  // set the motor going forward full speed vel_lin=0.3132m/s vel_ang=3.48rad/s vel_ang_motor=15.66 rad/s
  var angular_velocity=kinematic(0.3132,3.48);
  motor_left.forward(angular_velocity.left);
});

console.log("\nEsperando a que inicialice el dispositivo...");
