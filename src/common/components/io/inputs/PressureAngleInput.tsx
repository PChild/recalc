import { uuid } from "common/tooling/util";
import { useEffect } from "react";

type Props = {
    stateHook?: any[];
    selectId?: string;
};

export default function PressureAngleInput(props: Props) {
  props = { ...props, selectId: props.selectId || uuid() };

  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [pressureAngle, setPressureAngle] = props.stateHook;

  useEffect(() => {
    setPressureAngle(pressureAngle);
  }, [pressureAngle]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label" htmlFor={props.selectId}>
          Pressure Angle
        </label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p className="control">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <span className="select">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <select
              defaultValue={pressureAngle}
              onChange={(e) => setPressureAngle(e.target.value)}
              id={props.selectId}
              data-testid={props.selectId}
            >
              {["14.5°", "20°"].map((c) => (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <option key={c}>{c}</option>
              ))}
            </select>
          </span>
        </p>
      </div>
    </div>
  );
}
