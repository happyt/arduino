var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(13);
  led.on();

  this.on("exit", function() {
    led.off();
  });

  this.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    on: function() {
      led.on();
    },
    off: function() {
      console.log("WW");
      led.off();
    }
  });
});
