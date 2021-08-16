import Measurement from "common/models/Measurement";

export function CalculateUnloadedSpeed(
  motor,
  rollerDiameter,
  intakeSides,
  ratio
) {
  if (ratio.asNumber() === 0 || motor.quantity === 0) {
    return new Measurement(0, "ft/s");
  }

  return motor.freeSpeed
    .div(ratio.asNumber())
    .mul(rollerDiameter.div(2))
    .mul(intakeSides)
    .mul(new Measurement(1, "rad^-1"));
}

export function CalculateLoadedSpeed(
  motor,
  rollerDiameter,
  load,
  ratio,
  intakeSides,
  efficiency
) {
  const stallDragLoad = CalculateStallDragLoad(
    motor,
    rollerDiameter,
    ratio,
    efficiency
  );

  if (ratio.asNumber() === 0 || stallDragLoad.scalar === 0) {
    return new Measurement(0, "ft/s");
  }

  const t1 = motor.freeSpeed
    .div(ratio.asNumber())
    .mul(new Measurement(360, "degree"))
    .div(new Measurement(60, "s"))
    .div(stallDragLoad)
    .mul(load)
    .mul(-1);

  const t2 = motor.freeSpeed
    .div(ratio.asNumber())
    .mul(new Measurement(360, "degree"))
    .div(new Measurement(60, "s"));

  const t3 = rollerDiameter.mul(Math.PI);

  const t4 = t1
    .add(t2)
    .mul(t3)
    .div(new Measurement(360, "degree"))
    .mul(new Measurement(1, "rpm^-1"))
    .mul(intakeSides);
  return t4;
}

export function CalculateStallDragLoad(
  motor,
  rollerDiameter,
  ratio,
  efficiency
) {
  if (rollerDiameter.scalar === 0) {
    return new Measurement(0, "lb");
  }
  return motor.stallTorque
    .mul(motor.quantity)
    .mul(ratio.asNumber())
    .mul(efficiency / 100)
    .div(rollerDiameter.div(2))
    .div(new Measurement(9.81, "m*s^-2"));
}

export function CalculateTimeToGoal(travelDistance, loadedSpeed) {
  if (loadedSpeed.baseScalar === 0) {
    return new Measurement(0, "s");
  }
  return travelDistance.div(loadedSpeed);
}

export function calculateCurrentDraw(motor, rollerDiameter, load, ratio) {
  if (ratio.asNumber() === 0 || motor.quantity === 0) {
    return new Measurement(0, "A");
  }
  const stallCurrent = motor.stallCurrent.mul(motor.quantity);
  const freeCurrent = motor.freeCurrent.mul(motor.quantity);
  const stallTorque = motor.stallTorque.mul(motor.quantity);

  const t4 = stallCurrent.sub(freeCurrent).div(stallTorque);

  const t5 = load.div(ratio.asNumber()).mul(rollerDiameter).div(2);
  const t6 = t4.mul(t5).mul(new Measurement(9.81, "m/s^2"));

  const totalCurrentDraw = t6.add(freeCurrent);
  return totalCurrentDraw.div(motor.quantity);
}
