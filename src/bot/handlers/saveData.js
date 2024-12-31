async function saveData(newData, fs, dataPath, bot, msgError) {
  try {
    const savedDataJSON = await fs.readFile(dataPath, "utf-8");
    const savedData = await JSON.parse(savedDataJSON);
    savedData.push(newData);
    const data = await JSON.stringify(savedData);
    await fs.writeFile(dataPath, data);
  } catch (e) {
    console.error(`${msgError}: ${e}`);
    return false;
  }
  return true;
}

module.exports = saveData;