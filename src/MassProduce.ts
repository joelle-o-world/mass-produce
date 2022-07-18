import fs from "fs";
import { spawn } from "child_process";

const generators: { [type: string]: () => string } = {
  frequency: () => `${Math.round(Math.random() * 20000 + 20)}Hz`,
};

export class MassProduce {
  private script: string;
  variables: { type: string; name: string; generate: () => string }[];

  constructor(script: string) {
    this.script = script;
    this.variables = this.extractVariables();
  }

  public async run() {
    return new Promise<void>((fulfil, reject) => {
      const populated = this.populateVariables();
      const p = spawn("bash", ["-c", this.script], {
        stdio: "inherit",
        env: this.populateVariables(),
      });
      p.on("close", () => fulfil());
      p.on("error", (err) => reject(err));
    });
  }

  populateVariables() {
    let env: { [key: string]: string } = {};
    for (let { name, generate } of this.variables) env[name] = generate();
    return env;
  }

  static variablePattern() {
    return /\$M([A\Za-z]+)(?:_?(\d+))?/g;
  }

  private extractVariables() {
    const occurances = this.script.matchAll(MassProduce.variablePattern());
    const unique: string[] = [];
    for (let occurance of occurances)
      if (!unique.includes(occurance[0])) unique.push(occurance[0]);
    return unique.map((v) => MassProduce.parseVariable(v));
  }

  private static parseVariable(str: string) {
    const result = MassProduce.variablePattern().exec(str);
    if (result) {
      const type = result[1];
      const generate = generators[type];
      if (!generate)
        throw new Error("No generator available for type: " + type);
      return {
        type,
        name: str.slice(1),
        generate,
      };
    } else throw "Cannot parse variable: " + str;
  }

  public static fromFile(path: string): Promise<MassProduce> {
    return new Promise((fulfil, reject) => {
      fs.readFile(path, { encoding: "utf-8" }, (err: any, script) => {
        if (err) reject(err);
        else fulfil(new MassProduce(script));
      });
    });
  }
}
