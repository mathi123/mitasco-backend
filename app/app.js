const Bootstrapper = require('./framework/bootstrapper');

const bootstrapper = new Bootstrapper();
const server = bootstrapper.run();
server.start();
