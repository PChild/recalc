// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'common/models/data/vBeltGuysIn... Remove this comment to see the full error message
import vBeltGuysInventoryJson from "common/models/data/vBeltGuysInventoryData.json";
import Measurement from "common/models/Measurement";
import { NotImplementedError } from "common/tooling/errors";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'goog... Remove this comment to see the full error message
import { GoogleSpreadsheet } from "google-spreadsheet";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { isEqual } from "lodash";

export default class Inventory {
  allRows: any;
  allowAuth: any;
  authCb: any;
  googleSpreadsheet: any;
  inventoryData: any;
  name: any;
  spreadsheetId: any;
  worksheet: any;
  worksheetName: any;
  constructor(
    name: any,
    spreadsheetId: any,
    inventoryData: any,
    allowAuth = true,
    authCb = () => {}
  ) {
    if (new.target === Inventory) {
      throw new TypeError("Cannot instantiate base class Inventory directly");
    }

    this.name = name;
    this.spreadsheetId = spreadsheetId;
    this.inventoryData = inventoryData;
    this.allowAuth = allowAuth && !process.env.REACT_APP_SKIP_GAUTH;
    this.authCb = authCb;

    this.worksheetName = `${name}_${process.env.NODE_ENV}`;
    this.worksheet = undefined;
    this.allRows = [];
    this.googleSpreadsheet = new GoogleSpreadsheet(spreadsheetId);
  }

  objToUrl(_: any) {
    throw new NotImplementedError("Inventory should implement objToUrl!");
  }

  shouldWrite(_: any) {
    throw new NotImplementedError("Inventory should implement shouldWrite!");
  }

  objToArray(_: any) {
    throw new NotImplementedError("Inventory should implement objToArray!");
  }

  async authenticate() {
    if (this.allowAuth) {
      this.authenticateServiceAccount()
        .then(() => this.googleSpreadsheet.loadInfo())
        .then(async () => {
          this.worksheet =
            this.googleSpreadsheet.sheetsByTitle[this.worksheetName];
        })
        .then(() => this.authCb(this));
    }
  }

  async authenticateServiceAccount() {
    await this.googleSpreadsheet.useServiceAccountAuth({
      client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
    });
  }

  scanInventory(obj: any) {
    const url = this.objToUrl(obj);
    let result = { found: false, has: undefined };

    this.inventoryData.forEach((item: any) => {
      if (item.generatedUrl === url) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'undefine... Remove this comment to see the full error message
        result = { found: true, has: Number(item.responseCode) === 200 };
      }
    });

    return result;
  }

  async writeToSheet(arr: any) {
    try {
      this.allRows = await this.worksheet.getRows();
    } catch (e) {
      console.log("Rate limited on gSheets reads ", e);
    }

    if (this.allRows.filter((row: any) => isEqual(row._rawData, arr)).length === 0) {
      try {
        await this.worksheet.addRow(arr);
      } catch (_) {
        console.log("Rate limited on gSheets writes");
      }
    }

    return null;
  }

  async pingWebsite(obj: any) {
    if (!this.allowAuth) {
      return;
    }

    const url = this.objToUrl(obj);
    // @ts-expect-error ts-migrate(1345) FIXME: An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
    if (this.shouldWrite(obj)) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'void' is not assignable to param... Remove this comment to see the full error message
      const response = await fetch(url);
      return await this.writeToSheet([
        // @ts-expect-error ts-migrate(2461) FIXME: Type 'void' is not an array type.
        ...this.objToArray(obj),
        response.status,
      ]);
    }
  }
}

export class VBeltGuysInventory extends Inventory {
  constructor({
    inventoryData = vBeltGuysInventoryJson,
    allowAuth = true,
    authCb = () => {},
  } = {}) {
    super(
      "VBeltGuys",
      "1po6dM_EVEPVecRIrvq-ThEfvFDRg-OO6uI9emKdDuqI",
      inventoryData,
      allowAuth,
      authCb
    );
  }

  objToUrl(obj: any) {
    const length = Math.round(obj.pitch.mul(obj.teeth).to("mm").scalar);
    const zeroPad = (num: any, places: any) => String(num).padStart(places, "0");

    return `https://www.vbeltguys.com/products/${length}-${
      obj.pitch.to("mm").scalar
    }m-${zeroPad(
      Number(obj.width.to("mm").scalar.toFixed(2)),
      2
    )}-synchronous-timing-belt`;
  }

  objToArray(obj: any) {
    return [
      String(obj.teeth),
      obj.pitch.to("mm").format(),
      `${Number(obj.width.to("mm").scalar.toFixed(2))} mm`,
      this.objToUrl(obj),
    ];
  }

  shouldWrite(obj: any) {
    return (
      obj.pitch.eq(new Measurement(3, "mm")) ||
      obj.pitch.eq(new Measurement(5, "mm"))
    );
  }
}
