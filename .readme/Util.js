const snakeToCamel = s => {
  return s.replace(/(\-\w)/g, m => m[1].toUpperCase());
};

const capitalizeFirstLetter = s => {
  return s[0].toUpperCase() + s.slice(1);
};

module.exports = {
  snakeToCamel,
  capitalizeFirstLetter,
};
