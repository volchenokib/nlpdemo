'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.use(serveStatic(__dirname + 'frontend/dist'));

const upload = multer({ dest: 'uploads/' });

app.post('/api', upload.single('file'), (req, res) => {
	const result = excelToJson({
		source: fs.readFileSync(path.resolve(__dirname, `./uploads/${req.file.filename}`)),
	});

	res.send(result);
});

// Handle production
// if (process.env.NODE_ENV === 'production') {
// }
// static folder
app.use(express.static(__dirname + '/public/'));

// handle spa
app.post(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
