#!/usr/bin/env node


module.exports = function() {
  let stdin = process.stdin,
    inputChunks = [];
  return new Promise(function(resolve){
    let timeout = () => {
      stdin.destroy();
    }

    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (chunk) {
      clearTimeout(timeout);
      inputChunks.push(chunk);
    });

    stdin.on('end', function () {
      clearTimeout(timeout);
      resolve(inputChunks.join("")); 
    });  

    setTimeout(timeout, 100)
  });
}
