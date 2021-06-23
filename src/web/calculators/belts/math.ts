import Belt from "common/models/Belt";
import Measurement from "common/models/Measurement";

// Reference: https://www.sdp-si.com/Belt-Drive/Designing-a-miniature-belt-drive.pdf

/**
 *
 * @param {number} teeth
 * @param {Measurement} pitch
 * @param {string} unit
 */
export function teethToPD(teeth: any, pitch: any, unit = undefined) {
  if (typeof teeth === "string") {
    if (teeth.length === 0) {
      return new Measurement(0, unit || pitch.units());
    }

    teeth = Number(teeth);
  }

  return pitch
    .mul(teeth)
    .div(Math.PI)
    .to(unit || pitch.units());
}

function calculateDistance(pitch: any, p1PitchDiameter: any, p2PitchDiameter: any, beltTeeth: any) {
  const belt = Belt.fromTeeth(beltTeeth, pitch);

  const b = belt.length
    .mul(2)
    .sub(p1PitchDiameter.add(p2PitchDiameter).mul(Math.PI));

  const pulleyDiff = p1PitchDiameter.sub(p2PitchDiameter).abs();

  const toSqrt = b.mul(b).sub(pulleyDiff.mul(pulleyDiff).mul(8)).to("in2");

  if (toSqrt.lte(new Measurement(0, "in2"))) {
    return new Measurement(0, "in");
  }

  const sqrt = new Measurement(Math.sqrt(toSqrt.scalar), "in");
  const CD = b.add(sqrt).div(8);

  return CD;
}

/**
 *
 * @param {Measurement} pitch
 * @param {Measurement} p1PitchDiameter
 * @param {Measurement} p2PitchDiameter
 * @param {Measurement} desiredCenter
 * @param {Measurement} extraCenter
 * @param {number} minBeltToothCount
 * @param {number} maxBeltToothCount
 * @param {number} beltToothIncrement
 */
export function calculateClosestCenters(
  pitch: any,
  p1PitchDiameter: any,
  p2PitchDiameter: any,
  desiredCenter: any,
  extraCenter: any,
  minBeltToothCount: any,
  maxBeltToothCount: any,
  beltToothIncrement: any
) {
  if (
    [
      minBeltToothCount,
      maxBeltToothCount,
      beltToothIncrement,
      pitch.baseScalar,
      desiredCenter.baseScalar,
      p1PitchDiameter.baseScalar,
      p2PitchDiameter.baseScalar,
    ].some((n) => n <= 0)
  ) {
    return {
      smaller: {
        teeth: 0,
        distance: new Measurement(0, "in"),
      },
      larger: {
        teeth: 0,
        distance: new Measurement(0, "in"),
      },
    };
  }

  let results = {};
  for (
    let i = minBeltToothCount;
    i <= maxBeltToothCount + beltToothIncrement;
    i += beltToothIncrement
  ) {
    const belt = Belt.fromTeeth(i, pitch);

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    results[i] = {
      centerDistance: calculateDistance(
        pitch,
        p1PitchDiameter,
        p2PitchDiameter,
        i
      ),
      toothCount: i,
      beltLength: belt.length,
    };
  }

  let closestSmallerSize = 0,
    closestLargerSize = 0;

  Object.keys(results).forEach((i) => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
    i = Number(i);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const centerDistance = results[i].centerDistance;
    if (centerDistance.lte(desiredCenter)) {
      if (closestSmallerSize === 0) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
        closestSmallerSize = i;
      } else {
        const currError = centerDistance.sub(desiredCenter);
        const prevError =
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          results[closestSmallerSize].centerDistance.sub(desiredCenter);
        if (-currError.baseScalar < -prevError.baseScalar) {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
          closestSmallerSize = i;
        }
      }
    }
  });

  if (closestSmallerSize > maxBeltToothCount) {
    closestSmallerSize = 0;
  }
  closestLargerSize =
    closestSmallerSize === 0 ||
    !(closestSmallerSize + beltToothIncrement in results)
      ? 0
      : closestSmallerSize + beltToothIncrement;

  return {
    smaller:
      closestSmallerSize !== 0
        ? {
            teeth: closestSmallerSize,
            distance:
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              results[closestSmallerSize].centerDistance.add(extraCenter),
          }
        : {
            teeth: 0,
            distance: new Measurement(0, "in"),
          },
    larger:
      closestLargerSize !== 0
        ? {
            teeth: closestLargerSize,
            distance:
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              results[closestLargerSize].centerDistance.add(extraCenter),
          }
        : {
            teeth: 0,
            distance: new Measurement(0, "in"),
          },
  };
}

export function calculateCenterGivenSpecificBelt(
  pitch: any,
  p1PitchDiameter: any,
  p2PitchDiameter: any,
  beltTeeth: any,
  extraCenter: any
) {
  return {
    smaller: {
      teeth: beltTeeth,
      distance: calculateDistance(
        pitch,
        p1PitchDiameter,
        p2PitchDiameter,
        beltTeeth
      ).add(extraCenter),
    },
    larger: {
      teeth: 0,
      distance: new Measurement(0, "in"),
    },
  };
}

export function calculateTeethInMesh(
  p1PitchDiameter: any,
  p2PitchDiameter: any,
  p1Teeth: any,
  p2Teeth: any,
  realDistance: any
) {
  if (realDistance.scalar <= 0) {
    return 0;
  }

  const D = Measurement.max(p1PitchDiameter, p2PitchDiameter);
  const d = Measurement.min(p1PitchDiameter, p2PitchDiameter);
  const div = D.sub(d).div(realDistance.mul(6));
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  return new Measurement(0.5).sub(div).mul(Math.min(p1Teeth, p2Teeth)).scalar;
}

export const testables = { calculateDistance };
