import { VBeltGuysInventory } from "common/models/Inventory";
import Measurement from "common/models/Measurement";
import propTypes from "prop-types";

const inv = new VBeltGuysInventory();
inv.authenticate();

function ScannableResult(props: any) {
  let beltScan = inv.scanInventory({ ...props });

  let div = <></>;
  if ((beltScan.found && beltScan.has) || !beltScan.found) {
    div = (
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
      <tr>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        <th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'a'.
          <a href={inv.objToUrl({ ...props })}>VBeltGuys</a>
        </th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
        <td></td>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
        <td>{props.pitch.format()}</td>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
        <td>{props.teeth}</td>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
        <td>{Number(props: any.width.to("mm").scalar.toFixed(2))} mm</td>
      </tr>
    );

    if (!beltScan.found) {
      inv.pingWebsite({ ...props });
    }
  }

  return div;
}

ScannableResult.propTypes = {
  teeth: propTypes.number,
  pitch: propTypes.instanceOf(Measurement),
  width: propTypes.instanceOf(Measurement),
};

function AvailableToHtml(props: any) {
  const tabulate = (available: any) => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
    return available.map((belt: any) => <tr
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'key'.
      key={belt.type + belt.teeth + belt.width + belt.pitch + Math.random()}
    >
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
      <th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'a'.
        <a href={belt.url}>{belt.vendor}</a>
      </th>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
      <td>{belt.type}</td>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
      <td>{belt.pitch}</td>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
      <td>{belt.teeth}</td>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
      <td>{belt.width}</td>
    </tr>);
  };

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'table'.
    <table className="table is-fullwidth is-hoverable">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'thead'.
      <thead>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
        <tr>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Vendor</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Type</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Pitch</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Teeth</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Width</th>
        </tr>
      </thead>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tbody'.
      <tbody>
        // @ts-expect-error ts-migrate(2693) FIXME: 'any' only refers to a type, but is being used as ... Remove this comment to see the full error message
        {tabulate(props: any.smallAvailable)}
        <ScannableResult
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'teeth'.
          teeth={props.smallBelt}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'pitch'.
          pitch={props.pitch}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'width'.
          width={new Measurement(9, "mm")}
        />
        // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'ScannableResult' as a type.
        <ScannableResult
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'teeth'.
          teeth={props.smallBelt}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'pitch'.
          pitch={props.pitch}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'width'.
          width={new Measurement(15, "mm")}
        />

        // @ts-expect-error ts-migrate(2693) FIXME: 'any' only refers to a type, but is being used as ... Remove this comment to see the full error message
        {tabulate(props: any.largeAvailable)}
        {props.largeBelt != 0 && (
          <>
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'ScannableResult' as a type.
            <ScannableResult
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'teeth'.
              teeth={props.largeBelt}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'pitch'.
              pitch={props.pitch}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'width'.
              width={new Measurement(9, "mm")}
            />
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'ScannableResult' as a type.
            <ScannableResult
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'teeth'.
              teeth={props.largeBelt}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'pitch'.
              pitch={props.pitch}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'width'.
              width={new Measurement(15, "mm")}
            />
          </>
        )}
      </tbody>
    </table>
  );
}

AvailableToHtml.propTypes = {
  smallAvailable: propTypes.array,
  largeAvailable: propTypes.array,
  smallBelt: propTypes.number,
  largeBelt: propTypes.number,
  pitch: propTypes.instanceOf(Measurement),
};

export default function LinkGenerator(props: any) {
  let smallAvailable: any = [],
    largeAvailable = [];

  const isValidBelt = (beltObj: any, teeth: any, pitch: any) => {
    return (
      beltObj.teeth === teeth &&
      pitch.to("mm").scalar.toString() === beltObj.pitch.replace(" mm", "")
    );
  };

  props.data.forEach((belt: any) => {
    if (isValidBelt(belt, props.smallBelt, props.pitch)) {
      smallAvailable.push(belt);
    }
    if (isValidBelt(belt, props.largeBelt, props.pitch)) {
      largeAvailable.push(belt);
    }
  });

  return (
    <>
      // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'AvailableToHtml' as a type.
      <AvailableToHtml
        smallAvailable={smallAvailable}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ largeAvailable: any[]; }' is not assignabl... Remove this comment to see the full error message
        largeAvailable={largeAvailable}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'smallBelt'.
        smallBelt={props.smallBelt}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'largeBelt'.
        largeBelt={props.largeBelt}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'pitch'.
        pitch={props.pitch}
      />
    </>
  );
}

LinkGenerator.propTypes = {
  smallBelt: propTypes.number,
  largeBelt: propTypes.number,
  pitch: propTypes.instanceOf(Measurement),
  data: propTypes.any,
};
