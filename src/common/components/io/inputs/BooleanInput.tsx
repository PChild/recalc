import { uuid } from "common/tooling/util";
import propTypes from "prop-types";

export default function BooleanInput(props: any) {
  const [value, setValue] = props.stateHook;
  props = { ...props, inputId: props.inputId || uuid() };

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
      className=""
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
      style={{
        // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        paddingTop: "0.375rem",
      }}
    >
      <input
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'id'.
        id={props.inputId}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'type'.
        type="checkbox"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
        className="switch is-thin"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'defaultChecked'.
        defaultChecked={value}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'onClick'.
        onClick={(e) => setValue(e.target.checked)}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
        data-testid={props.inputId}
      />
      <label htmlFor={props.inputId}>{props.label}</label>
    </div>
  );
}

BooleanInput.propTypes = {
  stateHook: propTypes.array,
  label: propTypes.string,
  inputId: propTypes.string,
};
