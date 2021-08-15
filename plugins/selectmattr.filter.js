const { path, filter } = require("ramda");

module.exports = (array, ...props) => filter(path(props))(array);