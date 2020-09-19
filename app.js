// import modules
const express = require('express');
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
	// do thing
});

app.post('/submit', (req, res) => {
	// to thing
});

// listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server started, listening on port ' + PORT);
});
