'use strict';

// bechmark: https://github.com/bestiejs/benchmark.js/
// microtime: https://github.com/wadey/node-microtime

const Benchmark = require('benchmark');
// const {} = require('..');
const log = console.log; // eslint-disable-line

const suite = new Benchmark.Suite;

suite.add('RegExp#test', () => {
    /o/.test('Hello World!');
}).add('String#indexOf', () => {
    'Hello World'.indexOf('o') > -1;
}).on('cycle', (event) => {
    log(String(event.target));
}).on('complete', function() {
    log('Fastest is ' + this.filter('fastest').map('name'));
}).run({
    'async': true
});
