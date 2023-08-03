#!/usr/bin/node
const mysql = require('mysql');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

if (process.argv[2] !== 'yes') {
	process.exit(1);
}

const connection = mysql.createConnection({
	host: process.env.SS_DATABASE_SERVER,
	user: process.env.SS_DATABASE_USERNAME,
	password: process.env.SS_DATABASE_PASSWORD,
	database: process.env.SS_DATABASE_NAME,
	multipleStatements: true
});

connection.connect((err) => {
	if (err) throw err;

	connection.query('SHOW TABLES', (err, results) => {
		if (err) throw err;

		results.forEach((row) => {
				const tableName = Object.values(row)[0];
				connection.query(`DROP TABLE \`${tableName}\``, (err) => {
						if (err) throw err;
				});
		});

		const dumpFilePath = path.join(__dirname, '../../dev/docker/mariadb/initdb.sql.gz');
		let sql = '';
		fs.createReadStream(dumpFilePath)
			.pipe(zlib.createGunzip())
			.on('data', (chunk) => {
				sql += chunk.toString();
			})
			.on('end', () => {
				connection.query(sql, (err) => {
					if (err) throw err;
				});
				connection.end();
			})
			.on('error', (err) => {
				throw err;
			});
	});
});
