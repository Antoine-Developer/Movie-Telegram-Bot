function btnHandler (findData, userID, UserIDs, msgErrorFindUser, bot, sendMovie, chatID, movieStorageID, recivedMovieID, saveData, msgErrorSaveUser, messageID, msgSoonAccess) {
 try {
  bot.on("callback_query", async (acctionBtn) => {
    const activeBtn = acctionBtn.data;
    const btnID = acctionBtn.message.message_id;
    if ((activeBtn === "btn2") && (messageID === btnID)) {
      const isRegister = await findData(userID, UserIDs, msgErrorFindUser);
      if (isRegister) {
          try {
            await bot.deleteMessage(chatID, btnID+1)
            await bot.deleteMessage(chatID, btnID)
          } catch (e) {
            console.error("Error al intentar eliminar los sms en btnHandler: "+ e)
          }
        try {
          await sendMovie(bot, chatID,movieStorageID,recivedMovieID);
          console.log("Nuevo usuario obtuvo pelicula");
        } catch (e) {console.error("Error al enviar pelicula en btnHandler: " + e)}
      } else {
        try {
          await bot.sendMessage(chatID, msgSoonAccess);
        } catch (e) {
          console.error("Error al enviarle sms al usuario de no tiene accseso a descargar peli en btnH" + e);
        }
        try {
          await saveData(userID, UserIDs, msgErrorSaveUser);
        } catch (e) {
          console.error("Error al intentar guadrdar el UserID en la base de datos btnH: " + e);
        }
      }
    }
    bot.answerCallbackQuery(acctionBtn.id)
      .catch((e) => console.error("Btn Handler answerCallbackQuery error: " + e));
  });
 } catch (e) {console.error("Error general en Btn Handler: " + e)}
}

module.exports = btnHandler;