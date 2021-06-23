// Original Python implementation by 2877 Ligerbots:
// https://github.com/ligerbots/dslogparser/blob/3f240dddc6d87bba8a2ff5823e8aa941b002a9b4/dslogparser/dslogparser.py

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'bits... Remove this comment to see the full error message
import BitString from "bitstring";
import { Buffer } from "buffer";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import _ from "lodash";
import moment from "moment";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'pyth... Remove this comment to see the full error message
import struct from "python-struct";

const dsLogTimestep = 0.02;
const maxInt64 = Math.pow(2, 63) - 1;

class DSError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "DSError";
  }
}

class BinaryReader {
  binary: any;
  index: any;
  constructor(binary: any) {
    this.binary = binary;
    this.index = 0;
  }

  read(bytes: any) {
    const ret = this.binary.slice(this.index, this.index + bytes);
    this.index += bytes;
    return ret;
  }
}

function unpackBits(rawValue: any) {
  return [...new BitString(rawValue).bin()].map((c) => c !== "1");
}

function shiftFloat(rawValue: any, shiftRight: any) {
  return rawValue / Math.pow(2.0, shiftRight);
}

function uintFromBytes(bytes: any, offset: any, size: any) {
  const firstByte = Math.floor(offset / 8);
  const numBytes = Math.ceil(size / 8);

  let uint;
  if (numBytes === 1) {
    uint = struct.unpackFrom(">B", bytes, undefined, firstByte)[0];
  } else if (numBytes === 2) {
    uint = struct.unpackFrom(">H", bytes, undefined, firstByte)[0];
  } else {
    throw new DSError(`Can't extract uint from numBytes=${numBytes}`);
  }

  const leftBitshift = offset - firstByte * 8;
  const rightBitShift = numBytes * 8 - size - leftBitshift;

  return (uint & (0xffff >> leftBitshift)) >> rightBitShift;
}

export class DSLogParser {
  binary: any;
  currentTime: any;
  stream: any;
  version: any;
  constructor(binary: any) {
    this.binary = Buffer.from(binary);
    this.stream = new BinaryReader(this.binary);
    this.readHeader();
  }

  stepTime() {
    this.currentTime = this.currentTime.add(dsLogTimestep, "s");
  }

  readHeader() {
    this.version = struct.unpack(">i", this.stream.read(4))[0];

    if (this.version !== 3) {
      throw new DSError(`Unknown file version number ${this.version}`);
    }

    this.currentTime = this.readTimestamp();
  }

  readTimestamp() {
    const b1 = this.stream.read(8);
    const b2 = this.stream.read(8);

    const sec = struct.unpack(">q", b1)[0];
    const ms = struct.unpack(">Q", b2)[0];

    return moment
      .utc("1904-01-01")
      .add(sec.toNumber() + ms.toNumber() / maxInt64, "s");
  }

  readRecords() {
    if (this.version !== 3) {
      throw new DSError(`Unknown file version number ${this.version}`);
    }

    const ret = [];
    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while (true) {
      const r = this.readRecordV3();
      if (r === null) {
        break;
      } else {
        // console.log(r);
        ret.push(r);
      }
    }

    return ret;
  }

  readRecordV3() {
    const dataBytes = this.stream.read(10);
    if (dataBytes.length < 10) {
      return null;
    }

    const pdpBytes = this.stream.read(25);
    if (pdpBytes.length < 25) {
      throw new DSError("No data for PDP. Unexpected EOF");
    }

    let res = { time: this.currentTime.toISOString() };
    Object.assign(res, this.parseDataV3(dataBytes));
    Object.assign(res, this.parsePDPV3(pdpBytes));
    this.stepTime();
    return res;
  }

  parseDataV3(dataBytes: any) {
    const rawValues = struct.unpack(">BBHBcBBH", dataBytes);
    const statusBits = unpackBits(rawValues[4]);

    return {
      brownout: statusBits[0],
      watchdog: statusBits[1],
      dsTele: statusBits[2],
      dsAuto: statusBits[3],
      dsDisabled: statusBits[4],
      robotTele: statusBits[5],
      robotAuto: statusBits[6],
      robotDisabled: statusBits[7],

      roundTripTime: shiftFloat(rawValues[0], 1),
      packetLoss: 0.04 * rawValues[1],
      voltage: shiftFloat(rawValues[2], 8),
      rioCpu: 0.01 * shiftFloat(rawValues[3], 1),
      canUsage: 0.01 * shiftFloat(rawValues[5], 1),
      wifiDb: shiftFloat(rawValues[6], 1),
      bandwidth: shiftFloat(rawValues[7], 8),
    };
  }

  parsePDPV3(pdpBytes: any) {
    const pdpOffsets = [
      8, 18, 28, 38, 48, 58, 72, 82, 92, 102, 112, 122, 136, 146, 156, 166,
    ];

    const vals = pdpOffsets.map((offset) =>
      shiftFloat(uintFromBytes(pdpBytes, offset, 10), 3)
    );
    const totalCurrent = _.sum(vals);

    return {
      pdpTotalCurrent: totalCurrent,
      pdpCurrents: vals,
      pdpId: uintFromBytes(pdpBytes, 0, 8),
      pdpResistance: uintFromBytes(pdpBytes, 176, 8),
      pdpVoltage: uintFromBytes(pdpBytes, 184, 8),
      pdpTemp: uintFromBytes(pdpBytes, 192, 8),
    };
  }
}
