import { NotImplementedError } from "common/tooling/errors";
import { decodeJson, encodeJson } from "use-query-params";

export default class Model {
  name: any;
  constructor(name: any, dataMap: any) {
    if (name !== undefined && dataMap !== undefined) {
      this.name = name;
      const data = dataMap[name];
      Object.entries(data).forEach(([k, v]) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[k] = v;
      });
    }
  }

  toDict() {
    throw new NotImplementedError("All models must implement toDict!");
  }

  static fromDict() {
    throw new NotImplementedError("All models must implement fromDict!");
  }

  /**
   *
   * @returns {{encode: (function(Model): string), decode: (function(string): Model)}}
   */
  static getParam() {
    return {
      encode: (model: any) => encodeJson(model.toDict()),
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      decode: (string: any) => this.fromDict(decodeJson(string)),
    };
  }
}
