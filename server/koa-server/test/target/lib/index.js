const config = require('../config');
const app = require('./app');
const argv = require('yargs').argv;
const conf = {};
if (argv.port) {
    conf.port = argv.port;
}
app(Object.assign({}, config, { conf }));
//# sourceMappingURL=index.js.map