import Model from "common/models/Model";

// @ts-expect-error ts-migrate(2417) FIXME: Class static side 'typeof Ratio' incorrectly exten... Remove this comment to see the full error message
export default class Ratio extends Model {
  magnitude: any;
  ratioType: any;
  static get REDUCTION() {
    return "Reduction";
  }
  static get STEP_UP() {
    return "Step-up";
  }

  /**
   *
   * @param {number} magnitude - Magnitude of the ratio
   * @param {string} ratioType - Either "Reduction" or "Step-up"
   */
  constructor(magnitude: any, ratioType = Ratio.REDUCTION) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
    super();
    this.magnitude = magnitude;
    this.ratioType = ratioType;

    if (
      ratioType !== undefined &&
      ratioType !== Ratio.REDUCTION &&
      ratioType !== Ratio.STEP_UP
    ) {
      throw TypeError("Invalid ratio type: " + String(ratioType));
    }
  }

  /**
   *
   * @returns {number} Returns the ratio as a X:1 reduction number
   */
  asNumber() {
    if (this.magnitude === 0 || this.ratioType === Ratio.REDUCTION) {
      return this.magnitude;
    } else {
      return 1.0 / this.magnitude;
    }
  }

  toDict() {
    return {
      magnitude: this.magnitude,
      ratioType: this.ratioType,
    };
  }

  static fromDict(dict: any) {
    return new Ratio(dict.magnitude, dict.ratioType);
  }

  eq(other: any) {
    if (!(other instanceof Ratio)) {
      return false;
    }

    return (
      other.magnitude === this.magnitude && other.ratioType === this.ratioType
    );
  }
}
