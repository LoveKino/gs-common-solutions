const config = require('../config');
const app = require('./app');
const argv = require('yargs').argv;

const conf = {};
if (argv.port) {
    conf.port = argv.port;
}

app({...config, conf});
