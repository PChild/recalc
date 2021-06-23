import { teethToPD } from "./math";

export default function CheatSheet() {
  const Pulley = (vendor: any, chain: any, teeth: any, bore: any, wrong = false) => {
    return {
      vendor,
      chain,
      teeth,
      bore,
      pd: teethToPD(teeth, chain).to("in").scalar.toFixed(3),
      wrong,
    };
  };

  const data = [
    Pulley("REV", "#25", 10, "NEO/CIM (8mm)"),
    Pulley("VEXPro, WCP, AndyMark", "#25", 16, '3/8" Hex', true),
    Pulley("VEXPro, WCP", "#25", 18, '3/8" Hex', true),
    Pulley("VEXPro, WCP", "#25", 22, '3/8" Hex', true),
    Pulley("AndyMark", "#25", 24, '3/8" Hex'),

    Pulley("VEXPro, WCP, AndyMark", "#25", 16, '1/2" Hex', true),
    Pulley("AndyMark", "#25", 17, '1/2" Hex'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 18, '1/2" Hex', true),
    Pulley("VEXPro, WCP, AndyMark", "#25", 22, '1/2" Hex', true),
    Pulley("AndyMark", "#25", 24, '1/2" Hex'),

    Pulley("VEXPro, WCP, AndyMark", "#25", 16, '1/2" ID', true),
    Pulley("AndyMark", "#25", 18, '1/2" ID'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 22, '1/2" ID', true),
    Pulley("AndyMark", "#25", 24, '1/2" ID'),

    Pulley("VEXPro, WCP, AndyMark", "#25", 32, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 34, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 36, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 38, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 40, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 42, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP", "#25", 44, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 48, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 54, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP", "#25", 58, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 60, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP", "#25", 64, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#25", 66, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP", "#25", 72, '1-1/8" Bearing Bore'),

    Pulley("VEXPro, WCP", "#35", 12, '1/2" Hex'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 15, '1/2" Hex'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 12, '1/2" ID'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 15, '1/2" ID'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 22, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 24, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 26, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 28, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 30, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 32, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP", "#35", 33, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 36, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 42, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP", "#35", 44, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 48, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 54, '1-1/8" Bearing Bore'),
    Pulley("VEXPro, WCP, AndyMark", "#35", 60, '1-1/8" Bearing Bore'),
  ];

  return <>
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'table'.
    <table className="table is-hoverable is-narrow">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'thead'.
      <thead>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
        <tr>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Vendor</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Chain</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Teeth</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>Bore</th>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
          <th>
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'abbr'.
            <abbr title="Pitch Diameter">PD</abbr>
          </th>
        </tr>
      </thead>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tbody'.
      <tbody>
        {data.map((pulley: any) => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'quot'.
          let pdText = <>{pulley.pd}&quot;</>;
          if (pulley.wrong) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'number'.
            pdText = <i>{pdText}</i>;
          }

          return (
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
            <tr
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'key'.
              key={
                pulley.vendor +
                pulley.teeth +
                pulley.bore +
                pulley.type +
                pulley.chain
              }
            >
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
              <td>{pulley.vendor}</td>
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
              <td>{pulley.chain}</td>
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
              <td>{pulley.teeth}T</td>
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
              <td>{pulley.bore}</td>
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
              <td>{pdText}</td>
            </tr>
          );
        })}
      // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
      </tbody>
    </table>
  </>;
}
