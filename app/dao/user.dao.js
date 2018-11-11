const { userQueries: query } = require('./queries/user.queries');
const connectionPool = require('../db/connection.pool').getPool();
const authService = require('../service/authentication.service');
const { RequestResultService: RRS } = require("../service/request_result.service");

class userDao {
	getuser(refreshToken) {
		return new Promise((resolve, reject) => {
			connectionPool.query(query.getuser, [refreshToken], (err, data) => {
				if (err) {
					reject(err);
				}
				if (data && data.length == 0) {
					return reject(404)
				}
				resolve(data);
			})
		});
	};

	getLoggeduser(userName, password) {
		return new Promise((resolve, reject) => {
			connectionPool.query(query.getLoggeduser, [userName, password], (err, data) => {
				if (err) {
					return reject(err);
				}
				if (data.length == 0) {
					return reject()
				}
				resolve(data[0])
			});
		})
	};


	signUp(data) {
		return new Promise((resolve, reject) => {
			data.RefreshToken = authService.randomHash();
			connectionPool.query(query.signUp, [data.Username, data.Password, data.Lastname, data.Name, data.RefreshToken], (err, result) => {
				if (err) {
					console.log(err.code)
					if (err.code == "ER_DUP_ENTRY") {
						reject(RRS.create(400, "ER_DUP_ENTRY"));
					} else {
						reject(RRS.create(400, err));
					}
				}

				const tokenObject = { id: result.insertId };
				const token = authService.jwtSign(tokenObject);
				const sendingData = {
					token,
					refreshToken: data.RefreshToken
				};

				resolve(RRS.create(200, sendingData))
			})


		})
	}

	signUpChat(data) {
		return new Promise((resolve, reject) => {
			connectionPool.query(query.signUpChat, [data.SourceId, data.Text, data.DestinationId], (err, result) => {
				if (err) {
					if (err.code == "ER_NO_REFERENCED_ROW_2") {
						reject(RRS.create(400, "ER_NO_REFERENCED_ROW_2"));
					} else {
						reject(RRS.create(400, err));
					}
				}
				resolve(RRS.create(200, 'ok'))
			})
		})
	}

	getAlluser(id) {
		return new Promise((resolve, reject) => {
			connectionPool.query(query.getAllUser, [id], (err, data) => {
				if (err) {
					reject(RRS.create(400, err));
				}
				resolve(RRS.create(200, data))
				
			})
		});
	};

	getAllChat(data) {
		console.log(data)
		return new Promise((resolve, reject) => {
			connectionPool.query(query.getAllChat, [data.id,Number(data.limit),Number(data.offset)], (err, data) => {
				if (err) {
					reject(RRS.create(400, err));
				}
				resolve(RRS.create(200, data))
			})
		});
	};

	getAllChatCount(id) {
		return new Promise((resolve, reject) => {
			connectionPool.query(query.getAllChatCount, [id], (err, data) => {
				if (err) {
					reject(RRS.create(400, err));
				}
				resolve(RRS.create(200, data))
			})
		});
	};

	resetPassword(data) {
		return new Promise((resolve, reject) => {
			connectionPool.query(query.resetPassword, [data.NewPassword,data.Username], (err, result) => {
				if(err) {
                    return reject(RRS.create(418, err))
                }
                if(result.affectedRows === 0 && result.changedRows === 0) {
                    return reject(RRS.create(404, "That field not found"));
                }
                return resolve(RRS.create(200, "reset success"));
				
			})
		});
	};
}

module.exports.userDao = new userDao();