const { path, filter, not, pipe } = require("ramda");

module.exports = (array, ...props) => filter(pipe(path(props), not))(array);