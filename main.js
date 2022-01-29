// Importing mysql and csvtojson packages
// Requiring module
const express = require("express");
const app = express();
const csvtojson = require('csvtojson');
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Database credentials
const hostname = "localhost",
	username = "root",
	password = "",
	databsename = ""


// Establish connection to the database
let con = mysql.createConnection({
	host: hostname,
	user: username,
	password: password,
	database: databsename,
});

// con.connect((err) => {
// 	if (err) return console.error(
// 			'error: ' + err.message);

// 	con.query("DROP TABLE sample",
// 		(err, drop) => {

// 		// Query to create table "sample"
// 		var createStatament =
// 		"CREATE TABLE sample(Name char(50), " +
// 		"Email char(50), Age int, city char(30))"

// 		// Creating table "sample"
// 		con.query(createStatament, (err, drop) => {
// 			if (err)
// 				console.log("ERROR: ", err);
// 		});
// 	});
// });

// CSV file name
const fileName = "customer_transactions.csv";

csvtojson().fromFile(fileName).then(source => {

	// Fetching the data from each row
	// and inserting to the table "sample"
	for (var i = 0; i < source.length; i++) {
		var party_key = source[i]["party_key"],
        residential_country_cd = source[i]["residential_country_cd"],
        party_open_date = source[i]["party_open_date"]

		var insertStatement =
		`INSERT INTO tran values(?, ?, ?,?,?)`;
		var items = [party_key, residential_country_cd, party_open_date];

		// Inserting data of current row
		// into database
		con.query(insertStatement, items,
			(err, results, fields) => {
			if (err) {
				console.log(
	"Unable to insert item at row ", i + 1);
				return console.log(err);
			}
		});
	}
	console.log(
"All items stored into database successfully");
});

// app.get("/customers", (req, res) => {
//     con.query("SELECT * FROM cus_info", (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         // console.log(result);
//         res.send(result);
//       }
//     });
//   });

//   app.listen(3001, () => {
//     console.log("Yey, your server is running on port 3001");
//   });  