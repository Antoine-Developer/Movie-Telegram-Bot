function isFromMovieStorage(msg, movieStorageID) {
  if (msg.chat.id === movieStorageID) {
    return true;
  } else {return false;}
}

function isVideo(msg) {
  if (msg.video) {
    return true;
  } else {return false;}
}

async function hasHistory(fs, dataPath) {
  try {
    await fs.readFile(dataPath, "utf-8");
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = {
  isFromMovieStorage,
  isVideo,
  hasHistory
}
