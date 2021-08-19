import 'jest-extended';
import {jest} from '@jest/globals';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';


interface FitLine {
  raw : string;
  methodName : string;
  parameters : string[];
}

class FitParser {
  
  public parse(line: string) : FitLine {

    const lines = line.split('|');
    const methodName = lines.filter((element, index) => {
      return index % 2 !== 0;
    }).join(' ').trim();

    const parameters = lines.filter((element, index) => {
      return index % 2 === 0;
    });

    const model : FitLine = { raw: line, methodName : methodName, parameters: parameters };
    return model;
  }

}

test('parse fit line', () => {
  const parser = new FitParser();
  const parts = parser.parse("!|Select search row where|Customer|equals|50000|");

  expect(parts.methodName).toEqual('Select search row where equals');
});

