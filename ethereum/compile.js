const path = require('path');
const fs = require('fs');
const solc = require('solc');

const studentPath = path.resolve(__dirname, 'contract', 'student.sol');
const source = fs.readFileSync(studentPath, 'utf8');

// console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[':Student'];
