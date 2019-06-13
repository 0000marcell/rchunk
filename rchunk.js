#!/usr/bin/env node

const program = require('commander');
const readstdin = require('readstdin');

const fs = require('fs');

function rchunk(beg, end, rcontent, file) {

  let nlr = '#@',
      regex = 
        new RegExp(`(${beg}[^${nlr}]+(${nlr})).*(${end}[^${nlr}]+(${nlr}))`);

  return result = fs.readFileSync(file, 'utf8')
          .replace(/\n/g, nlr)
          .replace(regex, `${rcontent}`)
          .replace(/#@/g, "\n").trim();
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

    let data;
    try {
      data = await readstdin(); 
    }catch(err) {
      console.log('you need to pipe in the replace data: ', err);
    }
    console.log(
      rchunk(cmd['beggining'], cmd['end'], data, cmd['file'])
    );
  });

program.parse(process.argv);
