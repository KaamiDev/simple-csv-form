// import modules
const express = require('express');
const ObjectsToCsv = require('objects-to-csv');
const csv = require('objects-to-csv');

// initialize app
const app = express();

// setup templating
app.set('view engine', 'ejs');

// setup middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup routes
app.get('/', (req, res) => {
	res.render('index.ejs', { status: req.query.status });
});

app.post('/submit', (req, res) => {
	if (req.body.name && req.body.surname && req.body.email) {
		let data = [
			{
				name: req.body.name,
				surname: req.body.surname,
				email: req.body.email
			}
		];

		new ObjectsToCsv(data).toDisk('./data.csv', {
			append: true
		});
	} else {
		res.redirect('back');
	}
});

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server started, listening on port ' + PORT);
});
