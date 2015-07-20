

var http = require("http");
var router = require("./router");

var server = http.createServer(function(request, response){
	router.home(request, response);
	router.user(request, response);
});


server.listen(3000, "localhost");
console.log("Server is listeniong on port 3000");