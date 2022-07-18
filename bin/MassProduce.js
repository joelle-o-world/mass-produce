"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MassProduce = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const generators = {
    frequency: () => `${Math.round(Math.random() * 20000 + 20)}Hz`,
};
class MassProduce {
    constructor(script) {
        this.script = script;
        this.variables = this.extractVariables();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((fulfil, reject) => {
                const populated = this.populateVariables();
                const p = (0, child_process_1.spawn)("bash", ["-c", this.script], {
                    stdio: "inherit",
                    env: this.populateVariables(),
                });
                p.on("close", () => fulfil());
                p.on("error", (err) => reject(err));
            });
        });
    }
    populateVariables() {
        let env = {};
        for (let { name, generate } of this.variables)
            env[name] = generate();
        return env;
    }
    static variablePattern() {
        return /\$M([A\Za-z]+)(?:_?(\d+))?/g;
    }
    extractVariables() {
        const occurances = this.script.matchAll(MassProduce.variablePattern());
        const unique = [];
        for (let occurance of occurances)
            if (!unique.includes(occurance[0]))
                unique.push(occurance[0]);
        return unique.map((v) => MassProduce.parseVariable(v));
    }
    static parseVariable(str) {
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
        }
        else
            throw "Cannot parse variable: " + str;
    }
    static fromFile(path) {
        return new Promise((fulfil, reject) => {
            fs_1.default.readFile(path, { encoding: "utf-8" }, (err, script) => {
                if (err)
                    reject(err);
                else
                    fulfil(new MassProduce(script));
            });
        });
    }
}
exports.MassProduce = MassProduce;
