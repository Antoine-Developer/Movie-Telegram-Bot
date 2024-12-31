async function findData(fs, recivedID, dataPath, msgError) {
  let finded = false;
  try {
    const dataJSON = await fs.readFile(dataPath, "utf-8");
    const data = await JSON.parse(dataJSON);
    finded = data.some(dataID => dataID === recivedID);
  } catch (e) {
    console.error(
      `${msgError},
      ID que se intento buscar ${recivedID},
      error: ${e}` 
      );
  }
  return finded;
}

module.exports = findData;