#!/usr/bin/env node

const fs = require('fs');

function rchunk(beg, end, rcontent, file) {
  let fileContent = fs.readFileSync(file, 'utf8');
  let result = '';
  let flag = false;
  fileContent.split('\n').forEach((line) => {
    if(line.match(new RegExp(beg, 'i')) && !flag) {
      flag = true;
      result += 'REPLACE_THIS_WITH\n';
    } else if(line.match(new RegExp(end, 'i')) && flag) {
      flag = false;
    } else {
      if(!flag) 
        result += `${line}\n`;
    }
  });
  return result.replace('REPLACE_THIS_WITH', rcontent);
}

console.log(
  rchunk(process.argv[2], process.argv[3], process.argv[4], process.argv[5])
);
