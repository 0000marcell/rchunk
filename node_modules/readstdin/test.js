const readstdin = require('./readstdin');

async function test() {
  let data = await readstdin();
  console.log(data);
}

test();
