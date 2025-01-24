const msgIsNotVideo = "❌El mensaje enviado no es un video";
const msgSaveID =
  "✅El ID del archivo ha sido almacenado exitosamente en la base de datos";
const msgErrorSaveID =
  "❌Ha ocurrido un error al intentar guardar el ID del archivo en la base de datos";
const msgErrorFindUser =
  "❌Ha ocurrido un error al intentar buscar al usuario en la base de datos";
const msgErrorSaveUser =
  "❌Ha ocurrido un error al intentar guardar al usuario en la base de datos";
const msgErrorFindMovie =
  "❌Ha ocurrido un error al intentar buscar el Movie ID en la base de datos";
const msgInstructions = `🎬 ¡Bienvenido a tu cine personal!
Con este bot puedes recibir 🦄películas y series totalmente gratis en unos pocos pasos:
1️⃣ Pulsa "🚀Activar Acceso" y únete al grupo".
2️⃣ Regresa aquí y presiona "🛸Obtener Película".
3️⃣ ¡Listo! La película o serie llegará a tu chat.

✨ ¡Solo necesitas hacerlo una vez! Después, las películas se enviarán automáticamente. 🎥`;
const msgSoonAccess = `
🚫 ¡Acceso no permitido!
Antes de obtener la película, necesitas completar el paso previo:
1️⃣ Pulsa en "🚀Activar Acceso" y sigue las instrucciones.
2️⃣ Luego regresa aquí para presionar "🛸Obtener Película".`;

module.exports = {
  msgIsNotVideo,
  msgSaveID,
  msgErrorSaveID,
  msgErrorFindMovie,
  msgErrorFindUser,
  msgErrorSaveUser,
  msgInstructions,
  msgSoonAccess
};
