import { toolTipForIds } from "common/components/tooltips";
import { uuid } from "common/tooling/util";
import propTypes from "prop-types";

export function UnlabeledNumberInput(props: any) {
  const [value, setValue] = props.stateHook;

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="field has-addons">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p className="control is-expanded">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
        <input
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'type'.
          type="number"
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
          className="input input-right"
          // @ts-expect-error ts-migrate(2588) FIXME: Cannot assign to 'value' because it is a constant.
          value={value}
          // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'onChange'. Did you mean 'onchang... Remove this comment to see the full error message
          onChange={(e) => setValue(e.target.value)}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'id'.
          id={props.inputId}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'disabled'.
          disabled={props.disabled}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
          data-testid={props.inputId}
        />
      </p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'props'.
      {props.children}
    </div>
  );
}

UnlabeledNumberInput.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  inputId: propTypes.string,
  children: propTypes.any,
  disabled: propTypes.bool,
};

export function LabeledNumberInput(props: any) {
  props = {
    ...props,
    inputId: props.inputId || uuid(),
    labelFg: props.labelFg || 1,
  };

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="field is-horizontal">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className={`field-label is-normal fg-${props.labelFg}`}>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'label'.
        <label className="label" htmlFor={props.inputId}>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
          <span
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
            className="has-tooltip-right"
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
            data-tooltip={toolTipForIds(props.inputId, props.label)}
          // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
          >
            {props.label}
          </span>
        </label>
      </div>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className="field-body">
        // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'UnlabeledNumberInput' as a t... Remove this comment to see the full error message
        <UnlabeledNumberInput {...props} />
      </div>
    </div>
  );
}

LabeledNumberInput.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  label: propTypes.string,
  inputId: propTypes.string,
  disabled: propTypes.bool,
  labelFg: propTypes.number,
};
