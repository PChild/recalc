export default class Belt {
  length: any;
  pitch: any;
  teeth: any;
  constructor(teeth: any, pitch: any, length: any) {
    this.teeth = teeth;
    this.pitch = pitch;
    this.length = length;
  }

  static fromTeeth(teeth: any, pitch: any) {
    return new Belt(teeth, pitch, pitch.mul(teeth));
  }

  static fromLength(length: any, pitch: any) {
    return new Belt(
      Number(length.div(pitch).scalar.toFixed(10)),
      pitch,
      length
    );
  }
}
