const express = require('express');
var multer  = require('multer')
const app = express()
app.use(express.static(__dirname + '/public'))


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');	// define folder for uploaded files
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname); // define file name of uploaded files
  }
});
var upload = multer({ storage : storage}).single('dateiname');


app.post('/upload_image', function(req, res){
	upload(req, res, function(err) {
	  if(err) {
		console.log('Error Occured');
		return;
	  }
	  console.log(req.file);
	  res.end('Your File Uploaded');
	  console.log('Photo Uploaded');
	  });
});


app.listen(3000, function() {
  console.log('listening on 3000')
});


