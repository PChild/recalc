import Compressor from "common/models/Compressor";
import { useEffect, useState } from "react";

type Props = {
    stateHook?: any[];
};

export default function CompressorInput(props: Props) {
  // @ts-expect-error ts-migrate(2461) FIXME: Type 'any[] | undefined' is not an array type.
  const [compressor, setCompressor] = props.stateHook;
  const [compressorName, setCompressorName] = useState(compressor.name);

  useEffect(() => {
    setCompressor(new Compressor(compressorName));
  }, [compressorName]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="field is-horizontal">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-label is-normal">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <label className="label">Compressor</label>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="field-body">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p className="control">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <span className="select">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <select
              defaultValue={compressorName}
              onChange={(e) => setCompressorName(e.target.value)}
            >
              {Compressor.getAllCompressors().map((c) => (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </span>
        </p>
      </div>
    </div>
  );
}
