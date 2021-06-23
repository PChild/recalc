import propTypes from "prop-types";

import { UnlabeledNumberInput } from "./NumberInput";

export function UnlabeledTypedNumberInput(props: any) {
  const [magnitude, setMagnitude] = props.magnitudeStateHook;
  const [select, setSelect] = props.selectStateHook;

  return (
    // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'UnlabeledNumberInput' as a t... Remove this comment to see the full error message
    <UnlabeledNumberInput
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'stateHook'.
      stateHook={[magnitude, setMagnitude]}
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'inputId'.
      inputId={props.inputId}
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'disabled'.
      disabled={props.disabled}
    >
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p className="control">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
        <span className="select">
          // @ts-expect-error ts-migrate(2749) FIXME: 'select' refers to a value, but is being used as a... Remove this comment to see the full error message
          <select
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'value'.
            value={select}
            // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'onChange'. Did you mean 'onchang... Remove this comment to see the full error message
            onChange={(e) => setSelect(e.target.value)}
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'id'.
            id={props.selectId}
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
            data-testid={props.selectId}
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'disabled'.
            disabled={props.disabled}
          >
            // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
            {props.choices.map((c: any) => <option key={c}>{c}</option>)}
          </select>
        </span>
      </p>
    </UnlabeledNumberInput>
  );
}

export function LabeledTypedNumberInput(props: any) {
  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="field is-horizontal">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className="field-label is-normal">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'label'.
        <label className={"label " + props.labelClasses}>{props.label}</label>
      </div>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className="field-body">
        // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'UnlabeledTypedNumberInput' a... Remove this comment to see the full error message
        <UnlabeledTypedNumberInput {...props} />
      </div>
    </div>
  );
}

UnlabeledTypedNumberInput.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  magnitudeStateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  selectStateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  choices: propTypes.arrayOf(propTypes.string),
  inputId: propTypes.string,
  selectId: propTypes.string,
  disabled: propTypes.bool,
};

LabeledTypedNumberInput.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  magnitudeStateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  selectStateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  choices: propTypes.arrayOf(propTypes.string),
  label: propTypes.string,
  labelClasses: propTypes.string,
  inputId: propTypes.string,
  selectId: propTypes.string,
};
