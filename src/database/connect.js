async function connectDB (mongoose, password) {
  const uri = `mongodb+srv://antoinedev:${password}@movie-bot-db.nhrkr.mongodb.net/?retryWrites=true&w=majority&appName=movie-bot-db`;
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (e) {
    console.error("Error al intentar establecer conexion con MongoDB: " + e);
  }
}

module.exports = connectDB;