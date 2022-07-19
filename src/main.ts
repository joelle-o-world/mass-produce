#! /usr/local/bin/node

import { MassProduce } from "./MassProduce";

(async function main() {
  const scriptFile = process.argv[2];
  const instance = await MassProduce.fromFile(scriptFile);
  console.log("Found", instance.numberOfVariables(), "varying variables");

  const iterations = process.argv[3] || 1;
  for (let i = 0; i < iterations; ++i) {
    console.log("Run #" + i);
    await instance.run();
    console.log(`End of run #${i}\n`);
  }
})();
