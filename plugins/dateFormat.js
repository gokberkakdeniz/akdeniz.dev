const  dayjs = require("dayjs");

module.exports = (input) => {
  return dayjs(input).format("MMM D, YYYY");
};