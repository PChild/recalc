import { UnlabeledTypedNumberInput } from "common/components/io/inputs/TypedNumberInput";
import { toolTipForIds } from "common/components/tooltips";
import Ratio from "common/models/Ratio";
import { cleanNumberInput } from "common/tooling/io";
import { uuid } from "common/tooling/util";
import { useEffect, useState } from "react";

type UnlabeledRatioInputProps = {
    stateHook?: any[];
    inputId?: string;
};

export function UnlabeledRatioInput(props: UnlabeledRatioInputProps) {
  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [ratio, setRatio] = props.stateHook;
  const [amount, setAmount] = useState(ratio.magnitude);
  const [type, setType] = useState(ratio.ratioType);

  useEffect(() => {
    setRatio({
      amount: cleanNumberInput(amount),
      type: type,
    });
    setRatio(new Ratio(cleanNumberInput(amount), type));
  }, [amount, type]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <UnlabeledTypedNumberInput
      magnitudeStateHook={[amount, setAmount]}
      selectStateHook={[type, setType]}
      choices={[Ratio.REDUCTION, Ratio.STEP_UP]}
      inputId={props.inputId}
    />
  );
}

type LabeledRatioInputProps = {
    stateHook?: any[];
    label?: string;
    inputId?: string;
};

export function LabeledRatioInput(props: LabeledRatioInputProps) {
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
        <UnlabeledRatioInput {...props} />
      </div>
    </div>
  );
}
