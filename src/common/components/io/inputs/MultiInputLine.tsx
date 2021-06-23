
import { Fragment } from "react";

type Props = {
    label?: string;
    children?: any[];
};

export default function MultiInputLine(props: Props) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label">{props.label}</label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
        {props.children.map((c) => {
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          return <Fragment key={c.props.label}>{c}</Fragment>;
        })}
      </div>
    </div>
  );
}
