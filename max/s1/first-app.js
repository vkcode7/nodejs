const fs = require('fs'); //node filesystem API imported
console.log('Hello from first nodejs app');

fs.writeFileSync('hello.txt', 'Hello from node js');