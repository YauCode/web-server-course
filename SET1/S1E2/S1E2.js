// Allocating os module
const os = require('os');

console.log("System uptime in seconds: " + os.uptime());
console.log("Total system memory in bytes: " + os.totalmem());