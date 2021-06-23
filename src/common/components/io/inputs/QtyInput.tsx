import { UnlabeledTypedNumberInput } from "common/components/io/inputs/TypedNumberInput";
import { toolTipForIds } from "common/components/tooltips";
import Measurement from "common/models/Measurement";
import { cleanNumberInput } from "common/tooling/io";
import { uuid } from "common/tooling/util";
import { useEffect, useState } from "react";

type UnlabeledQtyInputProps = {
    stateHook?: any[];
    choices?: string[];
    inputId?: string;
    selectId?: string;
    disabled?: boolean;
};

export function UnlabeledQtyInput(props: UnlabeledQtyInputProps) {
  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [qty, setQty] = props.stateHook;
  const [magnitude, setMagnitude] = useState(qty.scalar);
  const [unit, setUnit] = useState(qty.units());

  if (
    props.disabled &&
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    props.stateHook[0].scalar.toString() !== magnitude.toString()
  ) {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    setMagnitude(props.stateHook[0].scalar);
  }

  useEffect(() => {
    setQty(new Measurement(cleanNumberInput(magnitude), unit));
  }, [magnitude, unit]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <UnlabeledTypedNumberInput
      magnitudeStateHook={[magnitude, setMagnitude]}
      selectStateHook={[unit, setUnit]}
      choices={props.choices}
      inputId={props.inputId}
      selectId={props.selectId}
      disabled={props.disabled}
    />
  );
}

type LabeledQtyInputProps = {
    stateHook?: any[];
    label?: string;
    choices?: string[];
    abbr?: string;
    wideLabel?: boolean;
    inputId?: string;
    selectId?: string;
    disabled?: boolean;
    labelFg?: number;
};

export function LabeledQtyInput(props: LabeledQtyInputProps) {
  props = {
    ...props,
    inputId: props.inputId || uuid(),
    labelFg: props.labelFg || 1,
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      className={"field is-horizontal" + (props.wideLabel ? " wide-label" : "")}
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={`field-label is-normal fg-${props.labelFg}`}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label" htmlFor={props.inputId}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <span
            className="has-tooltip-right"
            data-tooltip={toolTipForIds(props.inputId, props.abbr, props.label)}
          >
            {props.label}
          </span>
        </label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <UnlabeledQtyInput {...props} />
      </div>
    </div>
  );
}
