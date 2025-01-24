async function findData(recivedID, Model, msgError) {
  let finded = false;
  try {
    const isInBD = await Model.findOne({ id: recivedID });
    if (isInBD !== null) finded = true;
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
