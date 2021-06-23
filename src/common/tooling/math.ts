import Measurement from "common/models/Measurement";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import maxBy from "lodash/maxBy";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import minBy from "lodash/minBy";

/**
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {function(*): *}
 */
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'x1' implicitly has an 'any' type.
export function fit([x1, y1], [x2, y2]) {
  const slope = (y2 - y1) / (x2 - x1);
  return (x: any) => slope * (x - x2) + y2;
}

/**
 * @param {...Measurement}
 * @returns {Measurement}
 */
export function measurementMin() {
  return minBy(arguments, (q: any) => q.scalar);
}

/**
 * @param {...Measurement}
 * @returns {Measurement}
 */
export function measurementMax() {
  return maxBy(arguments, (q: any) => q.scalar);
}

export const CIRCLE_RIGHT = new Measurement(0, "deg");
export const CIRCLE_UP = new Measurement(90, "deg");
export const CIRCLE_LEFT = new Measurement(180, "deg");
export const CIRCLE_DOWN = new Measurement(270, "deg");

export const CIRCLE_UP_RIGHT = new Measurement(45, "deg");
export const CIRCLE_UP_LEFT = new Measurement(135, "deg");
export const CIRCLE_DOWN_RIGHT = new Measurement(225, "deg");
export const CIRCLE_DOWN_LEFT = new Measurement(315, "deg");

/**
 * @param {Measurement} angle
 */
export function cleanAngleInput(angle: any) {
  const prevUnits = angle.units();

  if (angle.to("rad").scalar >= 90) {
    angle = angle.sub(new Measurement(90, "rad"));
  }

  return angle.to(prevUnits);
}
