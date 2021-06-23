import { UnlabeledTypedNumberInput } from "common/components/io/inputs/TypedNumberInput";
import { toolTipForIds } from "common/components/tooltips";
import Motor from "common/models/Motor";
import { cleanNumberInput } from "common/tooling/io";
import { uuid } from "common/tooling/util";
import { useEffect, useState } from "react";

type UnlabeledMotorInputProps = {
    stateHook?: any[];
    choices?: string[];
    inputId?: string;
    selectId?: string;
};

export function UnlabeledMotorInput(props: UnlabeledMotorInputProps) {
  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [motor, setMotor] = props.stateHook;
  const [magnitude, setMagnitude] = useState(motor.quantity);
  const [unit, setUnit] = useState(motor.name);

  useEffect(() => {
    setMotor(new Motor(cleanNumberInput(magnitude), unit));
  }, [magnitude, unit]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <UnlabeledTypedNumberInput
      magnitudeStateHook={[magnitude, setMagnitude]}
      selectStateHook={[unit, setUnit]}
      choices={props.choices}
      inputId={props.inputId}
      selectId={props.selectId}
    />
  );
}

type LabeledMotorInputProps = {
    stateHook?: any[];
    choices?: string[];
    label?: string;
    inputId?: string;
    selectId?: string;
};

export function LabeledMotorInput(props: LabeledMotorInputProps) {
  props = { ...props, inputId: props.inputId || uuid() };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label" htmlFor={props.inputId}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <span
            className="has-tooltip-right"
            data-tooltip={toolTipForIds(props.inputId, props.label)}
          >
            {props.label}
          </span>
        </label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <UnlabeledMotorInput {...props} />
      </div>
    </div>
  );
}
