import { uuid } from "common/tooling/util";
import { useEffect, useState } from "react";

type UnlabeledQtyOutputProps = {
    stateHook?: any[];
    choices?: string[];
    precision?: number;
    inputId?: string;
    selectId?: string;
    isLoading?: boolean;
};

export function UnlabeledQtyOutput(props: UnlabeledQtyOutputProps) {
  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [qty, setQty] = props.stateHook;
  const [unit, setUnit] = useState(qty.units());

  useEffect(() => {
    setQty(qty.to(unit));
  }, [unit]);

  const value = props.precision
    ? qty.to(unit).scalar.toFixed(props.precision)
    : qty.to(unit).scalar;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field has-addons">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p
        className={
          "control is-expanded" + (props.isLoading ? " is-loading" : "")
        }
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <input
          disabled
          className={"input input-right"}
          value={value}
          id={props.inputId}
          data-testid={props.inputId}
        />
      </p>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p className="control">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <span className="select">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            id={props.selectId}
          >
            {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
            {props.choices.map((c) => (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <option key={c}>{c}</option>
            ))}
          </select>
        </span>
      </p>
    </div>
  );
}

type LabeledQtyOutputProps = {
    stateHook?: any[];
    choices?: string[];
    precision?: number;
    label?: string;
    inputId?: string;
    selectId?: string;
    isLoading?: boolean;
};

export function LabeledQtyOutput(props: LabeledQtyOutputProps) {
  props = { ...props, inputId: props.inputId || uuid() };
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label" htmlFor={props.inputId}>
          {props.label}
        </label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <UnlabeledQtyOutput {...props} />
      </div>
    </div>
  );
}
