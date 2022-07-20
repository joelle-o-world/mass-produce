#! /usr/local/bin/node

import { MassProduce } from "./MassProduce";

(async function main() {
  const scriptFile = process.argv[2];
  const instance = await MassProduce.fromFile(scriptFile);
  console.log("Found", instance.numberOfVariables(), "varying variables");

  const iterations = Number(process.argv[3] || 1);
  for (let i = 1; i < iterations + 1; ++i) {
    console.log("|- Run #" + i + "\n");
    await instance.run({ iteration: String(i) });
    console.log(`\n|- End of run #${i}\n`);
  }
})();
