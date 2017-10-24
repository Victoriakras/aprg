// Initialisiert socket.io
var socket = io.connect();

// set event handler that dispatches incoming  messages
function onRangechanged(data){
	var slider = document.getElementById('slider');
	slider.value = data.value;
}
socket.on("rangechanged",onRangechanged);


// define event handler for range element
var slider = document.getElementById("slider");
function sliderHandler(){
	var value = parseInt(this.value);
	socket.emit('rangechanged', {'value': value});
}
slider.addEventListener('change', sliderHandler, false);
