"use strict";

class userQueries {
	static get getLoggeduser() {
		return `SELECT id, Username, refreshToken from user WHERE Username = ? and Password = ?`;
	};

	static get getuser() {
		return `SELECT Id, Username from user WHERE refreshToken = ?`;
	};

	static get signUp() {
		return `INSERT INTO user
			(id,
			Username,
			Password,
			Lastname,
			Name,
			RefreshToken
			)
			VALUES
			(null,
			?,
			?,
			?,
			?,
			?);
		`;
	};

	static get signUpChat() {
		return `INSERT INTO chat
			(id,
			CreateTime,
			SourceId,
			Text,
			DestinationId)
			VALUES
			(null,
			now(),
			?,
			?,
			?)`;
	};

	static get getAllUser() {
		return `SELECT Id, Username,Name,Lastname from user WHERE id <> ?`;
	};

	static get getAllChatCount() {
		return `SELECT count(id) as count FROM chat where SourceId = ?`;
	};

	static get getAllChat() {
		return `SELECT chat.*,us.Name as Name,us.Lastname,us.Username FROM 
				user_chat.chat 
					inner join user_chat.user as us 
						on us.id = chat.DestinationId 
					where chat.SourceId = ?
					ORDER BY chat.id DESC LIMIT ? OFFSET ?`;
	};

	static get resetPassword(){
		return `UPDATE user
		SET
		Password = ?
		WHERE Username = ?`;
	}
}

module.exports = { userQueries };
