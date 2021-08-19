"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-extended");
class FitParser {
    parse(line) {
        const lines = line.split('|');
        const methodName = lines.filter((element, index) => {
            return index % 2 !== 0;
        }).join(' ').trim();
        const parameters = lines.filter((element, index) => {
            return index % 2 === 0;
        });
        const model = { raw: line, methodName: methodName, parameters: parameters };
        return model;
    }
}
test('parse fit line', () => {
    const parser = new FitParser();
    const parts = parser.parse("!|Select search row where|Customer|equals|50000|");
    expect(parts.methodName).toEqual('Select search row where equals');
});
//# sourceMappingURL=fit-parse.test.js.map