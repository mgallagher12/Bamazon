var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'bamazon'
})

connection.connect(function(err) {
	if (err) {
		console.log(err);
		return;
	}
	//console.log(connection);

	runQuery();
})

function runQuery(item_id) {
	//var sql = "SELECT * FROM products WHERE `item_id` > ?";
	var sql = "SELECT * FROM products";
	var values = [item_id];

	connection.query(sql, function(err, res) {
		if(err) {
			console.log(err);
			connection.end();
		}

		console.log("ID\tProduct\t\tPrice\tStock Quantity");
		console.log("------\t-------\t\t-------\t------");
		for (var i = 0; i < res.length; i++) {
			var row = res[i];
			console.log(row.item_id + "\t" + row.product_name + "\t\t" + row.price + "\t" + row.stock_quantity);

		}
		start();
	});
}

function start() {
	inquirer.prompt({
			name: 'item_id',
			type: 'input',
			message: 'What is the item_id of the product you would like to purchase?',
			validate: function(value) {
				if (isNaN(value) === false) {
					return true;
				}
				return false;
			}
		}).then(function(answer) {
			if (answer.stock_quantity >= 1) {
				transaction();
			} else {
				console.log("Sorry that item is out of stock. Please select a new product.");
				start();
			}
		});
}

function transaction() {
	inquirer.prompt({
		name: 'stock',
		type: 'input',
		message: 'How many units would you like to purchase?',
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}).then(function())
}