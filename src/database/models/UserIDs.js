const {Schema, model} = require("mongoose");

const userIdSchema = new Schema({
	id: {
	  type: Number
	}
});

module.exports = model("UserIDs", userIdSchema);