import { toolTipForIds } from "common/components/tooltips";
import { uuid } from "common/tooling/util";
import { useEffect, useState } from "react";

type UnlabeledPatientNumberInputProps = {
    stateHook?: any[];
    inputId?: string;
    children?: any;
    delay?: number;
};

export function UnlabeledPatientNumberInput(props: UnlabeledPatientNumberInputProps) {
  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [value, setValue] = props.stateHook;
  const [preValue, setPreValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setValue(preValue), props.delay);
    return () => clearTimeout(timeoutId);
  }, [preValue]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field has-addons">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <p className="control is-expanded">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <input
          type="number"
          className="input input-right"
          value={preValue}
          onChange={(e) => setPreValue(e.target.value)}
          id={props.inputId}
        />
      </p>
      {props.children}
    </div>
  );
}

type LabeledPatientNumberInputProps = {
    stateHook?: any[];
    label?: string;
    inputId?: string;
    delay?: number;
};

export function LabeledPatientNumberInput(props: LabeledPatientNumberInputProps) {
  props = { ...props, inputId: props.inputId || uuid() };
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <span
          className="has-tooltip-right"
          data-tooltip={toolTipForIds(props.inputId, props.label)}
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <label className="label" htmlFor={props.inputId}>
            {props.label}
          </label>
        </span>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <UnlabeledPatientNumberInput {...props} />
      </div>
    </div>
  );
}
