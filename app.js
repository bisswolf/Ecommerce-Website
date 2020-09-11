var express = require("express");
var app = express();
var BodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fashionsite", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

// app.use(BodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
// app.use("/static", express.static("public"));

//-----------------------------SCHEMA--------------------------

var fashionSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});
var fashion = mongoose.model("fashion", fashionSchema);

// fashion.create(
// 	{
// 		name: "Sweat Shirt",
// 		image:
// 			"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRSU4Yo2SNUfUf-wIentZGz6S6b59LN016ufUCa4GwVpbK-NGOG&usqp=CAU",
// 	},
// 	function (err, fashion) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("it worked");
// 			console.log(fashion);
// 		}
// 	}
// );

app.get("/show/:id", function (req, res) {
	fashion.findById(req.params.id, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			res.render("show.ejs", { show: data });
		}
	});
});

// retriving data from database
app.get("/show", function (req, res) {
	fashion.find({}, function (err, fa) {
		if (err) {
			console.log(err);
		} else {
			res.render("frontpage.ejs", { fashions: fa });
		}
	});
});

app.listen(3000, function () {
	console.log("Server listening on port 3000");
});
