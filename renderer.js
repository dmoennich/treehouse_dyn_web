var fs = require("fs");
var ejs = require("ejs");



var view = function(response, templateName, values){
	try {
		var template = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});
		response.write(ejs.render(template, values || {}));
	}catch (error) {
		console.error("Error loading the template: " + templateName);
	}
};


module.exports.view = view;