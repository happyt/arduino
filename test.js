var SerialPort = require('serialport');
// var SerialPort = serialport.SerialPort;
 
// list serial ports:
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});

var myPort = new SerialPort('COM5', {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: SerialPort.parsers.readline("\n")
 });

myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

var cmd = [4,17];
var ss= bin2string(cmd);

sendSerialData(ss);

function bin2string(array) {
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}

function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
}
 
function sendSerialData(data) {
   console.log(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}