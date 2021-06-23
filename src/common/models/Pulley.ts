export default class Pulley {
  pitch: any;
  pitchDiameter: any;
  teeth: any;
  constructor(teeth: any, pitch: any, pitchDiameter: any) {
    this.teeth = teeth;
    this.pitch = pitch;
    this.pitchDiameter = pitchDiameter;
  }

  static fromTeeth(teeth: any, pitch: any) {
    return new Pulley(teeth, pitch, pitch.mul(teeth).div(Math.PI));
  }

  static fromPitchDiameter(pitchDiameter: any, pitch: any) {
    return new Pulley(
      Number(pitchDiameter.mul(Math.PI).div(pitch).scalar.toFixed(2)),
      pitch,
      pitchDiameter
    );
  }
}
