import Model from "common/models/Model";

class InvalidModel extends Model {
  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
    super();
  }
}

describe("Model", () => {
  describe("Invalid model", () => {
    test("fails on toDict()", () => {
      expect(() => new InvalidModel().toDict()).toThrow(
        "All models must implement toDict!"
      );
    });

    test("fails on fromDict()", () => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      expect(() => InvalidModel.fromDict({})).toThrow(
        "All models must implement fromDict!"
      );
    });

    test("fails on getParam.encode", () => {
      const p = InvalidModel.getParam();

      expect(() => p.encode(new InvalidModel())).toThrow(
        "All models must implement toDict!"
      );
    });

    test("fails on getParam.decode", () => {
      const p = InvalidModel.getParam();

      expect(() => p.decode({})).toThrow("All models must implement fromDict!");
    });
  });

  describe("Valid model", () => {
    const toDictFn = jest.fn((m) => ({ a: m.a, b: m.b }));
    const fromDictFn = jest.fn((obj) => new ValidModel(obj.a, obj.b));

    // @ts-expect-error ts-migrate(2417) FIXME: Class static side 'typeof ValidModel' incorrectly ... Remove this comment to see the full error message
    class ValidModel extends Model {
      a: any;
      b: any;
      constructor(a: any, b: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
        super();
        this.a = a;
        this.b = b;
      }
      toDict() {
        return toDictFn(this);
      }

      static fromDict(obj: any) {
        return fromDictFn(obj);
      }
    }

    test("toDict works correctly", () => {
      const model = new ValidModel(5, 6);
      const retDict = model.toDict();
      expect(retDict).toEqual({ a: 5, b: 6 });
      expect(toDictFn.mock.calls).toHaveLength(1);
    });

    test("fromDict works correctly", () => {
      const dict = { a: 1, b: 2 };
      const model = ValidModel.fromDict(dict);
      expect(model.a).toEqual(1);
      expect(model.b).toEqual(2);
      expect(fromDictFn.mock.calls).toHaveLength(1);
    });
  });
});
