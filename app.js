var express = require("express");
var app = express();
var BodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fashionsite", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

app.use(BodyParser.urlencoded({ extended: true }));

//-----------------------------SCHEMA--------------------------

var fashionSchema = new mongoose.Schema({
	name: String,
	image: String,
});
var fashion = mongoose.model("fashion", fashionSchema);

// fashion.create(
// 	{
// 		name: "Blue shirt",
// 		image:
// 			"https://ae01.alicdn.com/kf/HTB1myK.JwaTBuNjSszfq6xgfpXa9/New-Autumn-Fashion-Brand-Men-Clothes-Slim-Fit-Men-Long-Sleeve-Shirt-Men-Plaid-Cotton-Casual.jpg_640x640.jpg",
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
// retriving data from database
fashion.find({}, function (err, fa) {
	if (err) {
		console.log(err);
	} else {
		console.log(fa);
	}
});

app.get("/", function (req, res) {
	res.render("frontpage.ejs");
});

app.listen(3000, function () {
	console.log("Server listening on port 3000");
});
