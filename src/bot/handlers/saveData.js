async function saveData(newData, Model, msgError) {
  try {
    const newDocument = new Model({
      id: newData
    });
    const savedDocument = await newDocument.save();
  } catch (e) {
    console.error(`${msgError}: ${e}`);
    console.error(`Id del error ${newData}`);
    return false;
  }
  return true;
}

module.exports = saveData;
