var Profile = require("./profile.js");
var renderer = require("./renderer");
var querystring = require("querystring");

var commonHeaders = {"Content-Type": "text/html"};


var home = function(request, response){

	if(request.url === "/"){
		if(request.method.toUpperCase() === "GET"){
			response.writeHead(200, commonHeaders);
			renderer.view(response, "header");
			renderer.view(response, "search");
			renderer.view(response, "footer");
			response.end();
		} else {
			request.on("data", function(postDataBuffer){
				var postData = querystring.parse(postDataBuffer.toString());
				response.writeHead(303, {location: "/" + postData.userName});
				response.end();
			});
		}

	}

};


var user = function(request, response){

	var userName = request.url.replace("/", "");
	if(userName.length > 0){

		response.writeHead(200, commonHeaders);
		renderer.view(response, "header");

		var studentProfile = new Profile(userName);
		studentProfile.on("end", function(profile){
			var subProfile = {
				userName: profile.name,
				badgeCount: profile.badges.length,
				javaScriptPoints: profile.points.JavaScript,
				avatarPic: profile.gravatar_url
			};
			renderer.view(response, "profile", subProfile);
			renderer.view(response, "footer");
			response.end();
		});

		studentProfile.on("error", function(error){
			renderer.view(response, "error", {errorMessage: error.message});
			renderer.view(response, "search");
			renderer.view(response, "footer");
			response.end();
		});


	}

};


module.exports.home = home;
module.exports.user = user;