const logger = require("./logger");

module.exports = function useUtils() {
  return { ...logger };
};
