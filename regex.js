const fs = require('fs');

let delimiter = process.argv[2];
let nlr = '#@';

let regex = 
  new RegExp(`(${delimiter}[^${nlr}]+(${nlr})).*(${delimiter}[^${nlr}]+(${nlr}))`);

let fileContent = fs.readFileSync('./tmp', 'utf8')
  .replace(/\n/g, nlr)
  .replace(regex, `testing${nlr}`)
  .replace(/#@/g, "\n").trim();

console.log(fileContent);
