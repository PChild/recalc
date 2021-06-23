import Material, { materialMap } from "common/models/Material";
import { uuid } from "common/tooling/util";
import { useEffect, useState } from "react";

type Props = {
    stateHook?: any[];
    label?: string;
    selectId?: string;
};

export default function MaterialInput(props: Props) {
  props = { ...props, selectId: props.selectId || uuid() };

  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [material, setMaterial] = props.stateHook;
  const [materialName, setMaterialName] = useState(material.name);

  useEffect(() => {
    setMaterial(new Material(materialName));
  }, [materialName]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label" htmlFor={props.selectId}>
          {props.label}
        </label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p className="control">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <span className="select">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <select
              defaultValue={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              id={props.selectId}
              data-testid={props.selectId}
            >
              {Object.keys(materialMap).map((c) => (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <option key={c}>{c}</option>
              ))}
            </select>
          </span>
        </p>
      </div>
    </div>
  );
}
