function btnHandler (findData, fs, userID, userDataPath, msgErrorFindUser, bot, sendMovie, chatID, movieStorageID, recivedMovieID, saveData, msgErrorSaveUser, dataPath, messageID, msgSoonAccess) {
  bot.on("callback_query", async (acctionBtn) => {
    const activeBtn = acctionBtn.data;
    const btnID = acctionBtn.message.message_id;
    console.log(messageID)
    console.log(btnID)
    if (activeBtn === "btn2" && messageID === btnID) {
      const isRegister = await findData(fs, userID, userDataPath, msgErrorFindUser);
      if (isRegister) {
        fs.unlink(dataPath).catch((e)=>console.error("Error al intentar eliminar la temporalData"+ e));
        await bot.deleteMessage(chatID, btnID);
        await bot.deleteMessage(chatID, btnID+1);
        await sendMovie(bot, chatID,movieStorageID,recivedMovieID);
      } else {
        await bot.sendMessage(chatID, msgSoonAccess);
        await saveData(userID, fs, userDataPath, bot, msgErrorSaveUser);
        bot.answerCallbackQuery(acctionBtn.id)
          .then(() => {})
          .catch((e) => console.error("Btn Handler answerCallbackQuery error: " + e));
      }
    }
  });
}

module.exports = btnHandler;