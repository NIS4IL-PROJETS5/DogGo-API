const logger = require("./logger");
const date = require("./date");

module.exports = function useUtils() {
  return { ...logger, ...date };
};
