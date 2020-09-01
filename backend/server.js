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
	const result = excelToJson({
		source: fs.readFileSync(path.resolve(__dirname, `./uploads/${req.file.filename}`)),
	});

	res.send(result);
});

app.listen(port, () => {});
