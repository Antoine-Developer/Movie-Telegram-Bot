try {
  const TelegramBot = require("node-telegram-bot-api");
  const path = require("path");
  const mongoose = require("mongoose");

  const connectDB = require(
    path.join(__dirname, "src", "database", "connect.js")
  );
  const MovieIDs = require(
    path.join(__dirname, "src", "database", "schemas.js")
  );
  const UserIDs = require(
    path.join(__dirname, "src", "database", "models", "UserIDs.js")
  );

  const { isFromMovieStorage, isVideo, hasHistory } = require(
    path.join(__dirname, "src", "utils", "validators.js")
  );
  const saveData = require(
    path.join(__dirname, "src", "bot", "handlers", "saveData.js")
  );
  const findData = require(
    path.join(__dirname, "src", "bot", "handlers", "findData.js")
  );
  const btnHandler = require(
    path.join(__dirname, "src", "bot", "handlers", "btnHandler.js")
  );
  const { sendID, getRecivedMovieID, sendMovie, createBtnStructure } = require(
    path.join(__dirname, "src", "bot", "middlewares.js")
  );
  const {
    msgIsNotVideo,
    msgSaveID,
    msgErrorSaveID,
    msgErrorFindMovie,
    msgErrorFindUser,
    msgErrorSaveUser,
    msgInstructions,
    msgSoonAccess
  } = require(path.join(__dirname, "src", "utils", "messages.js"));

  const botToken = process.env.TOKEN;
  const movieStorageIDString = process.env.STORAGE_ID;
  const movieStorageID = Number(movieStorageIDString);
  const dbPassword = process.env.MONGO_PASSWORD;
  const referralLink = process.env.REFERRAL_LINK;

  connectDB(mongoose, dbPassword)
    .then(() => {
      const bot = new TelegramBot(botToken, { polling: true });

      bot.onText(/^\/start/, async msg => {
        const chatID = msg.chat.id;
        if (chatID !== movieStorageID) {
          const recivedMovieID = getRecivedMovieID(msg);
          if (recivedMovieID === -1) return;
          const isRecivedMovieIDInStorage = await findData(
            recivedMovieID,
            MovieIDs,
            msgErrorFindMovie
          );
          if (!isRecivedMovieIDInStorage) return;

          const userID = msg.from.id;
          const isUserRegister = await findData(
            userID,
            UserIDs,
            msgErrorFindUser
          );
          if (isUserRegister) {
            try {
              await sendMovie(bot, chatID, movieStorageID, recivedMovieID);
              console.log("Usuario veterano obtuvo pelicula");
            } catch (e) {
              console.error("Error al enviar pelicula en index: " + e);
            }
            return;
          }
          const msgStartID = msg.message_id; //start message
          const messageID = msg.message_id + 1; //welcome message
          try {
            await createBtnStructure(
              bot,
              chatID,
              referralLink,
              msgInstructions
            );
          } catch (e) {
            console.error("Error al crear la esructura de botones: " + e);
            return;
          }
          await btnHandler(
            findData,
            userID,
            UserIDs,
            msgErrorFindUser,
            bot,
            sendMovie,
            chatID,
            movieStorageID,
            recivedMovieID,
            saveData,
            msgErrorSaveUser,
            messageID,
            msgSoonAccess
          );
        }
      });
      bot.on("message", async msg => {
        const chatID = msg.chat.id;
        const isMsgFromMovieStorage = isFromMovieStorage(msg, movieStorageID);
        if (isMsgFromMovieStorage) {
          const isAVideo = isVideo(msg);
          if (isAVideo) {
            const isSaved = await saveData(
              msg.message_id,
              MovieIDs,
              msgErrorSaveID
            );
            if (isSaved) {
              try {
                bot.sendMessage(movieStorageID, msgSaveID);
                sendID(bot, movieStorageID, msg);
              } catch (e) {
                console.error(
                  `Error al intentar enviarle este mensaje: ${msgSaveID} y el ID al admin; error: ${e}`
                );
              }
            } else {
              try {
                bot.sendMessage(movieStorageID, msgErrorSaveID);
              } catch (e) {
                console.error(
                  "Error al intentar enviarle el error de guardado al admin"
                );
                console.error(
                  `Error al intentar enviarle este mensaje: ${msgErrorSaveID} al admin; error: ${e}`
                );
              }
            }
          } else {
            try {
              bot.sendMessage(movieStorageID, msgIsNotVideo);
            } catch (e) {
              console.error(
                `Error al intentar enviarle este mensaje: ${msgIsNotVideo} al admin; error: ${e}`
              );
            }
          }
          return;
        }
      });
      console.log("Bot Works...");
    })
    .catch(e => console.error("Error genaral db" + e));
} catch (e) {
  console.error("Error general" + e);
}
