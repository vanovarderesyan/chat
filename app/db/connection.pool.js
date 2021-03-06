const mysql2 = require('mysql2');
const connectionPool = Symbol('Connection pool');

class ConnectionPool {
	constructor() {
		this[connectionPool] = mysql2.createPool({
			host: 'localhost',
			user: 'user',
			port: "3306",
			password: "password",
			database: 'user_chat',
			connectionLimit: 10,
			waitForConnections: true,
			multipleStatements: true,
			dateStrings: true
		})
	}

	getPool() {
		return this[connectionPool];
	};
}

module.exports = new ConnectionPool();
