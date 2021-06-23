import { toolTipForIds } from "common/components/tooltips";
import { uuid } from "common/tooling/util";
import propTypes from "prop-types";

export function UnlabeledNumberOutput(props: any) {
  const value = props.precision
    ? props.stateHook[0].toFixed(props.precision)
    : props.stateHook[0];

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="field has-addons">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p className="control is-expanded">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
        <input
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'type'.
          type="number"
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'disabled'.
          disabled
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
          className="input input-right"
          // @ts-expect-error ts-migrate(2588) FIXME: Cannot assign to 'value' because it is a constant.
          value={value}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
          data-testid={props.inputId}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'id'.
          id={props.inputId}
        />
      </p>
    </div>
  );
}

UnlabeledNumberOutput.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  inputId: propTypes.string,
  precision: propTypes.number,
};

export function LabeledNumberOutput(props: any) {
  props = { ...props, inputId: props.inputId || uuid() };

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="field is-horizontal">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className="field-label is-normal">
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
        // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'UnlabeledNumberOutput' as a ... Remove this comment to see the full error message
        <UnlabeledNumberOutput {...props} />
      </div>
    </div>
  );
}

LabeledNumberOutput.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
  label: propTypes.string,
  inputId: propTypes.string,
  precision: propTypes.number,
};
