// import modules
const express = require('express');
const ObjectsToCsv = require('objects-to-csv');

// initialize app
const app = express();

// setup templating
app.set('view engine', 'ejs');

// setup middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// homepage route
app.get('/', (req, res) => {
	// renders view sending query parameter
	res.render('index.ejs', { status: req.query.status });
});

// submit route
app.post('/submit', (req, res) => {
	// makes sure no fields are missing
	if (req.body.name && req.body.surname && req.body.email) {
		// creates data array
		let data = [
			{
				name: req.body.name,
				surname: req.body.surname,
				email: req.body.email
			}
		];
		// writes data array to csv file, appending existing data
		new ObjectsToCsv(data).toDisk('./data.csv', {
			append: true
		});

		// redirects to submitted route
		res.redirect('/?status=submitted');
	} else {
		// if fields missing, redirects back
		res.redirect('back');
	}
});

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server started, listening on port ' + PORT);
});
