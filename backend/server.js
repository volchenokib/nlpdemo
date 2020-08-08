'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
	origin: 'http://localhost:8080',
};

const upload = multer({ dest: 'uploads/' });

app.use(cors(corsOptions));

app.post('/', upload.single('file'), (req, res) => {
	console.log('back', req.file);
	console.log('back', upload);

	const result = excelToJson({
		source: fs.readFileSync(path.resolve(__dirname, `./uploads/${req.file.filename}`)), // fs.readFileSync return a Buffer
	});

	console.log('result', result);

	res.send(result);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
