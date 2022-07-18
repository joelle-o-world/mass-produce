#! /usr/local/bin/node
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
Object.defineProperty(exports, "__esModule", { value: true });
const MassProduce_1 = require("./MassProduce");
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const scriptFile = process.argv[2];
        const instance = yield MassProduce_1.MassProduce.fromFile(scriptFile);
        const iterations = process.argv[3] || 1;
        for (let i = 0; i < iterations; ++i) {
            console.log("Run #" + i);
            instance.run();
        }
    });
})();
