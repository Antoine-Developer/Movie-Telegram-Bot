const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs/promises");
const path = require("path");

const {isFromMovieStorage, isVideo, hasHistory} = require(path.join(__dirname, "src", "utils", "validators.js"));
const saveData = require(path.join(__dirname, "src", "bot", "handlers", "saveData.js"));
const findData = require(path.join(__dirname, "src", "bot", "handlers", "findData.js"));
const btnHandler = require(path.join(__dirname, "src", "bot", "handlers", "btnHandler.js"));
const {sendID, getRecivedMovieID, sendMovie, createBtnStructure} = require(path.join(__dirname, "src", "bot", "middlewares.js"));
const {msgIsNotVideo, msgSaveID, msgErrorSaveID, msgErrorFindMovie, msgErrorFindUser, msgErrorSaveUser, msgInstructions, msgSoonAccess} = require(path.join(__dirname, "src", "utils", "messages.js"));
const moviesDataPath = path.join(__dirname, "src", "data", "data.json");

const botToken = process.env.TOKEN;
const movieStorageIDString = process.env.STORAGE_ID;
const movieStorageID = Number(movieStorageIDString);
const bot = new TelegramBot(botToken, {polling: true});

try {
  bot.onText(/^\/start/, async msg => {
  const chatID = msg.chat.id;
  if (chatID !== movieStorageID) {
    const recivedMovieID = getRecivedMovieID(msg);
    if (recivedMovieID === -1) return;
    const isRecivedMovieIDInStorage = await findData(fs, recivedMovieID, moviesDataPath, msgErrorFindMovie);
    if (!isRecivedMovieIDInStorage) return;
    const userID = msg.from.id;
    const userDataPath = path.join(__dirname, "src", "data", "userData.json");
    const temporalDataPath = path.join(__dirname, "src", "data", "temporalData");
    const dataFile = userID.toString() + ".json";
    const dataPath = path.join(temporalDataPath, dataFile);
    const isUserRegister = await findData(fs, userID, userDataPath, msgErrorFindUser);
    if (isUserRegister) {
      await sendMovie(bot, chatID,movieStorageID,recivedMovieID);
        fs.unlink(dataPath).catch(e=>{});
    } else {
      // EVitar que si el usuario escribe /start dos veces ocurra un error
      const hasStartHistory = await hasHistory(fs, dataPath);
      const msgStartID = msg.message_id;
      const messageID = msg.message_id + 1;
      try {
        if (hasStartHistory) {
          const lastStartIDJSON = await fs.readFile(dataPath, "utf-8");
          const lastStartID = await JSON.parse(lastStartIDJSON);
          await bot.deleteMessage(chatID, lastStartID+1);
          await bot.deleteMessage(chatID, lastStartID);
          fs.writeFile(dataPath, JSON.stringify(msgStartID));
        } else {fs.writeFile(dataPath, JSON.stringify(msgStartID));}
      } catch (e) {
        console.error("Error en la secction para evitar que el usuario escriba /start dos veces y se bugue");
      }
      
      await createBtnStructure(bot, chatID, msgInstructions);
      await btnHandler(findData, fs, userID, userDataPath, msgErrorFindUser, bot,sendMovie , chatID, movieStorageID, recivedMovieID, saveData, msgErrorSaveUser, dataPath, messageID, msgSoonAccess);
    }
  }
  });
  bot.on("message", async msg => {
    const chatID = msg.chat.id;
    const isMsgFromMovieStorage = isFromMovieStorage(msg, movieStorageID);
    if (isMsgFromMovieStorage) {
      const isAVideo = isVideo(msg);
      if (isAVideo) {
        const isSaved = await saveData(msg.message_id, fs, moviesDataPath, bot, msgErrorSaveID);
        if (isSaved) {
          await bot.sendMessage(movieStorageID, msgSaveID);
          await sendID(bot, movieStorageID, msg);
        } else {
          bot.sendMessage(movieStorageID, msgErrorSaveID);
        }
      } else {
        bot.sendMessage(movieStorageID, msgIsNotVideo);
      }
      return;
    }
  });
} catch (e) {
  console.error("Error general" + e);
}
	console.log("Bot Editado");
 console.log("Bot Works...");