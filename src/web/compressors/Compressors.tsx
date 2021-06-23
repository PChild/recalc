import HeadingWithBgImage from "common/components/headings/HeadingWithBgImage";
import Metadata from "common/components/Metadata";
import Table from "common/components/Table";
import Compressor from "common/models/Compressor";
import Measurement from "common/models/Measurement";
import { useMemo } from "react";
import config from "./index";
export default function Compressors() {
    const data = useMemo(() => Compressor.getAllCompressors().map((c) => ({
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        link: <a href={(c as any).url}>{c.name}</a>,
        weight: (c as any).weight.to("lb").scalar.toFixed(2),
        cfmZero: (c as any).cfmFn(new Measurement(0, "psi"))
            .to("ft3/min")
            .scalar.toFixed(2),
        cfmFourty: (c as any).cfmFn(new Measurement(40, "psi"))
            .to("ft3/min")
            .scalar.toFixed(2),
        cfmEighty: (c as any).cfmFn(new Measurement(80, "psi"))
            .to("ft3/min")
            .scalar.toFixed(2),
        cfmOneTen: (c as any).cfmFn(new Measurement(110, "psi"))
            .to("ft3/min")
            .scalar.toFixed(2),
        cfmPerLb: (c as any).cfmFn(new Measurement(110, "psi"))
            .div((c as any).weight)
            .to("ft3/min*lb")
            .scalar.toFixed(3),
        timeToFill: c
            .timeToFillmLToPSI(new Measurement(2000, "mL"), new Measurement(110, "psi"))
            .scalar.toFixed(0),
    })), []);
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "link",
        },
        {
            Header: "Weight (lb)",
            accessor: "weight",
        },
        {
            Header: "CFM at 0psi (ft³/min)",
            accessor: "cfmZero",
        },
        {
            Header: "CFM at 40psi (ft³/min)",
            accessor: "cfmFourty",
        },
        {
            Header: "CFM at 80psi (ft³/min)",
            accessor: "cfmEighty",
        },
        {
            Header: "CFM at 110psi (ft³/min)",
            accessor: "cfmOneTen",
        },
        {
            Header: "CFM/lb (110 psi)",
            accessor: "cfmPerLb",
        },
        {
            Header: "Time to fill 2000mL to 110psi (s)",
            accessor: "timeToFill",
        },
    ], []);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Metadata config={config}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <HeadingWithBgImage image={config.image} title={config.title}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Table columns={columns} data={data}/>
    </>);
}
