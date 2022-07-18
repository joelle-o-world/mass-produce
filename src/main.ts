import { MassProduce } from "./MassProduce";

(async function main() {
  const instance = await MassProduce.fromFile(process.argv[2]);
  instance.run();
})();
