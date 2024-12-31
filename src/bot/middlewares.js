function sendID(bot, movieStorageID, msg) {
  const message = `Descargar - http://t.me/birdsender_bot?start=${msg.message_id}`;
  bot.sendMessage(movieStorageID, `\`\`\`\n${message}\n\`\`\``, {
    parse_mode: 'MarkdownV2',
  });
}

function getRecivedMovieID (msg) {
  const commandWithID = msg.text;
  const commandWithIDArr = commandWithID.split("");
  const initialPosition = commandWithIDArr.lastIndexOf(" ") + 1;
  if (initialPosition !== 0) {
    const movieIDArr = commandWithIDArr.slice(initialPosition);
    const movieIDString = movieIDArr.join("");
    const movieID = Number(movieIDString);
    return movieID;
  } else {return -1;}
}

function sendMovie(bot, botID,movieStorageID,recivedMovieID) {
  const sendPlace = botID;
  bot.copyMessage(sendPlace, movieStorageID, recivedMovieID);
}

async function createBtnStructure(bot, chatID, msgInstructions) {
  const btn = {
    reply_markup : {
      inline_keyboard : [
        [
          {text: "🚀Activar Acceso", url: "https://t.me/Ganar_saldo_via_bot?start=r01495673200", callback_data: "btn1"},
          {text: "🛸Obtener Película", callback_data: "btn2"}  
        ]  
      ]
    }
  };
  await bot.sendMessage(chatID, msgInstructions, btn);
}


module.exports = {
  sendID,
  getRecivedMovieID,
  sendMovie,
  createBtnStructure
}