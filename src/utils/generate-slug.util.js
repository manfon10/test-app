const generateSlug = (title) => {
  const normalizeTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(
      // eslint-disable-next-line no-misleading-character-class
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize()
    .split(" ");

  return cleanArray(normalizeTitle)
    .join("_")
    .replace(/([^a-z0-9-.])/g, "_");
};

const cleanArray = (actual) => {
  const newArray = [];
  for (let i = 0, j = actual.length; i < j; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
};

module.exports = generateSlug;
