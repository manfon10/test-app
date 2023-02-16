const filterUniqueValues = (array) => {
  const arrayFilter = new Set(array.map(JSON.stringify));
  return Array.from(arrayFilter).map(JSON.parse);
};

module.exports = { filterUniqueValues };
