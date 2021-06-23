import Model from "common/models/Model";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'js-q... Remove this comment to see the full error message
import Qty from "js-quantities";

// @ts-expect-error ts-migrate(2417) FIXME: Class static side 'typeof Measurement' incorrectly... Remove this comment to see the full error message
export default class Measurement extends Model {
  add: any;
  compareTo: any;
  div: any;
  eq: any;
  gt: any;
  gte: any;
  innerQty: any;
  lt: any;
  lte: any;
  mul: any;
  same: any;
  sub: any;
  /**
   * Should not be used outside the Measurement class!
   * @param {Qty} qty - The js-quantities object to store internally.
   * @returns {Measurement} a new Measurement instance.
   */
  static fromQty(qty: any) {
    return new Measurement(qty.scalar, qty.units());
  }

  static get GRAVITY() {
    return new Measurement(-9.81, "m/s^2");
  }

  /**
   *
   * @param {number} magnitude - Magnitude of the measurement
   * @param {string=} units - Units of the measurement (optional)
   */
  constructor(magnitude: any, units: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
    super();
    this.innerQty = Measurement.simplify(Qty(magnitude, units));

    // Intellisense stubs
    this.add = () => {};
    this.sub = () => {};
    this.mul = () => {};
    this.div = () => {};
    this.eq = () => {};
    this.same = () => {};
    this.lt = () => {};
    this.lte = () => {};
    this.gt = () => {};
    this.gte = () => {};
    this.compareTo = () => {};

    [
      "add",
      "sub",
      "mul",
      "div",
      "eq",
      "same",
      "lt",
      "lte",
      "gt",
      "gte",
      "compareTo",
    ].forEach((fName) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this[fName] = (measurement_: any) => {
        if (!(measurement_ instanceof Measurement)) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          measurement_ = new Measurement(measurement_);
        }

        const jsQtyResult = this.innerQty[fName](measurement_.innerQty);
        if (jsQtyResult instanceof Qty) {
          return Measurement.fromQty(jsQtyResult);
        } else {
          return jsQtyResult;
        }
      };
    });
  }

  /**
   * Simplify the units of the given Qty to something we prefer.
   * Should not be called outside Measurement class!
   *
   * @param qty - js-quantities object to simplify.
   * @returns {Qty} The same object, either qty or qty.to( ... )
   */
  static simplify(qty: any) {
    const preferred = {
      resistance: "ohm",
      time: "s",
      mass: "lbs",
      length: "in",
      area: "in^2",
      angular_velocity: "rpm",
      energy: "J",
      current: "A",
      potential: "V",
      power: "W",
      pressure: "psi",
      density: "g/cm3",
      force: "N",
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return qty.kind() in preferred ? qty.to(preferred[qty.kind()]) : qty;
  }

  /**
   * Cast the measurement to another unit.
   * @param {string} units - Units to cast the measurement to.
   * @returns {Measurement} this (same instance)
   */
  to(units: any) {
    this.innerQty = this.innerQty.to(units);
    return this;
  }

  /**
   *
   * @returns {string} Retrieve the units of the measurement
   */
  units() {
    return this.innerQty.units();
  }

  /**
   *
   * @returns {number} The scalar of the measurement in its current units
   */
  get scalar() {
    return this.innerQty.scalar;
  }

  /**
   *
   * @returns {number} The scalar of the measurement in its most simplified units
   */
  get baseScalar() {
    return this.innerQty.baseScalar;
  }

  kind() {
    return this.innerQty.kind();
  }

  toDict() {
    return {
      s: this.innerQty.scalar,
      u: this.innerQty.units(),
    };
  }

  static fromDict(dict: any) {
    return new Measurement(Number(dict.s), dict.u);
  }

  /**
   *
   * @returns {Measurement} A copy of itself (new instance)
   */
  copy() {
    return new Measurement(this.innerQty.scalar, this.innerQty.units());
  }

  format() {
    // @ts-expect-error ts-migrate(2569) FIXME: Type 'IArguments' is not an array type or a string... Remove this comment to see the full error message
    return this.innerQty.format(...arguments);
  }

  toBase() {
    return new Measurement(
      this.innerQty.baseScalar,
      this.innerQty.toBase().units()
    );
  }

  clamp(floor: any, ceiling: any) {
    if (this.lt(floor)) {
      return floor;
    }
    if (this.gt(ceiling)) {
      return ceiling;
    }
    return this;
  }

  inverse() {
    const inverseQty = this.innerQty.inverse();
    return new Measurement(inverseQty.scalar, inverseQty.units());
  }

  abs() {
    return new Measurement(Math.abs(this.scalar), this.units());
  }

  sign() {
    return Math.sign(this.scalar);
  }

  negate() {
    return new Measurement(-this.scalar, this.units());
  }

  removeRad() {
    return this.div(new Measurement(1, "rad"));
  }

  static min(m1: any, m2: any) {
    return m1.lt(m2) ? m1 : m2;
  }

  static max(m1: any, m2: any) {
    return m1.gt(m2) ? m1 : m2;
  }

  toString() {
    return this.format();
  }

  forcePositive() {
    return new Measurement(Math.max(0, this.scalar), this.units());
  }

  round(n: any) {
    return new Measurement(Number(this.scalar.toFixed(n)), this.units());
  }
}
