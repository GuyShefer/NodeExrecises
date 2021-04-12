const yargs = require('yargs')

yargs.version('1.1.0')

const yargsArr = yargs.argv._;
const action = yargsArr[0];
const first = yargsArr[1];
const second = yargsArr[2];
let result = 0;

switch (action) {
    case 'add':
        result = first + second;
        break;
    case 'sub':
        result = first - second;
        break;
    case 'mult':
        result = first * second;
        break;
    case 'pow':
        result = Math.pow(first, 2);
        break;
}

console.log('result', result)

console.log(yargs.argv);