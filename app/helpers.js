
// wraps async router handlers
exports.wrapPromise = func => (...args) => func(...args).catch(args[2]);
