import propTypes from "prop-types";

import Piston from "../../../models/Piston";
// @ts-expect-error ts-migrate(6142) FIXME: Module './QtyInput' was resolved to '/home/justin/... Remove this comment to see the full error message
import { UnlabeledQtyInput } from "./QtyInput";

export default function TabularInput(props: any) {
  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="table-container">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'table'.
      <table className="table is-narrow center-table">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'thead'.
        <thead>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
          <tr>
            {props.headers.map((h: any) => {
              if (h instanceof Array) {
                return (
                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
                  <th key={h[0]}>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
                    <span
                      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
                      data-tooltip={h[1]}
                      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
                      className="has-tooltip-left has-tooltip-multiline has-tooltip-text-left"
                    >
                      {h[0]}
                    </span>
                  </th>
                );
              } else {
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
                return <th key={h}>{h}</th>;
              }
            })}
          // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
          </tr>
        </thead>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tbody'.
        <tbody>
          // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
          {props.inputs.map(([input, setInput], i: any) => {
            return (
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
              <tr key={`${i}`}>
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                <td>{props.labels[i]}</td>
                // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                {props.inputKeys.map((k: any, j: any) => {
                  if (k === "enabled") {
                    return (
                      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                      <td key={`${i}_${k}_${props.labels[i]}`}>
                        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'label'.
                        <label className="checkbox">
                          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
                          <input
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'type'.
                            type="checkbox"
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'checked'.
                            checked={input[k]}
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'onChange'.
                            onChange={() => {
                              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'setInput'.
                              setInput(
                                new Piston({
                                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
                                  ...input,
                                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
                                  [k]: !input[k],
                                })
                              );
                            }}
                          // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                          />
                        </label>
                      </td>
                    );
                  } else {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter '(Missing)' implicitly has an 'any' type... Remove this comment to see the full error message
                    return (
                      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'td' implicitly has an 'any' type.
                      <td key={`${i}_${k}_${props.labels[i]}`}>
                        <UnlabeledQtyInput
                          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'stateHook'.
                          stateHook={[
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
                            input[k],
                            (v: any) => {
                              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'setInput'.
                              setInput(
                                new Piston({
                                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'input'.
                                  ...input,
                                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'k'.
                                  [k]: v,
                                })
                              );
                            },
                          ]}
                          // @ts-expect-error ts-migrate(2588) FIXME: Cannot assign to 'choices' because it is a constan... Remove this comment to see the full error message
                          choices={props.choices[j]}
                        />
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
        </tbody>
      </table>
    </div>
  );
}

TabularInput.propTypes = {
  headers: propTypes.arrayOf(
    propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)])
  ),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  inputs: propTypes.arrayOf(propTypes.arrayOf(propTypes.any, propTypes.func)),
  labels: propTypes.arrayOf(propTypes.string),
  choices: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)),
  inputKeys: propTypes.arrayOf(propTypes.string),
};
