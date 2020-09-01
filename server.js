'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const serveStatic = require('serve-static');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 80;

const corsOptions = {
	origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));
app.use(serveStatic(__dirname + '/dist'));

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('../frontend/dist'));
// }

const upload = multer({ dest: 'uploads/' });

app.post('/', upload.single('file'), (req, res) => {
	const result = excelToJson({
		source: fs.readFileSync(path.resolve(__dirname, `./uploads/${req.file.filename}`)),
	});

	res.send(result);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
