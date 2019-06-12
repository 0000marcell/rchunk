#!/usr/bin/env node

const program = require('commander');
const readstdin = require('readstdin');

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
    //console.log(line);
  });
  return result.replace('REPLACE_THIS_WITH', rcontent);
}

program
  .description('replaces a part of the code')
  .option('-b, --beggining <beggining>', 'beggining of the regex')
  .option('-e, --end <end>', 'end of the regex')
  .option('-f, --file <file>', 'file to change')
  .action(async function(cmd) {
    if(!cmd['beggining'] || !cmd['end'] || !cmd['file']) {
      console.error('all parameters are required')
      return;
    }
    let data = await readstdin(); 
    console.log(
      rchunk(cmd['beggining'], cmd['end'], data, cmd['file'])
    );
  });

program.parse(process.argv);
