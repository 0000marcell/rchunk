#!/usr/bin/env node

module.exports = function() {
  let stdin = process.stdin,
    inputChunks = [];
  return new Promise(function(resolve){
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (chunk) {
      inputChunks.push(chunk);
    });

    stdin.on('end', function () {
      resolve(inputChunks.join("")); 
    });  
  });
}
