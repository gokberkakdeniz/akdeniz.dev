module.exports = (list, arg0, arg1 = undefined) => typeof arg1 === "undefined" ? list.slice(0, arg0) : list.slice(arg0, arg1);