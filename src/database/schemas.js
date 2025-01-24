const {Schema, model} = require("mongoose");

const movieIdSchema = new Schema({
	id: {
	  type: Number
	}
});

module.exports = model("MovieIDs", movieIdSchema);

// const userIdSchema = new mongoose.Schema({
// 	id: { type: Number, required: true, unique: true, index: true }
// });

// const UserIDModel = mongoose.model("UserIDModel", userIdSchema);
// module.exports = {
  // MovieIDModel
  // UserIDModel
// };