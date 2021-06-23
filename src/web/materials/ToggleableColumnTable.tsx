import { forwardRef, useEffect, useRef } from "react";
function zip(a: any, b: any, c: any) {
    let ret = [];
    for (let i = 0; i < Math.max(a.length, b.length, c.length); i++) {
        ret.push([
            i > a.length ? null : a[i],
            i > b.length ? null : b[i],
            i > c.length ? null : c[i],
        ]);
    }
    return ret;
}
type IndeterminateCheckboxProps = {
    indeterminate?: any;
};
const IndeterminateCheckbox = forwardRef<any, IndeterminateCheckboxProps>(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;
    useEffect(() => {
        (resolvedRef as any).current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <input type="checkbox" ref={resolvedRef} {...rest}/>;
});
IndeterminateCheckbox.displayName = "IndeterminateCheckbox";
const groups = {
    Basic: ["Material", "Name"],
    Mechanical: [
        "Density (g/cm³)",
        "Brinell Hardness",
        "Rockwell M Hardness",
        "Tensile Modulus (GPa)",
        "Elongation At Break (%)",
        "Fatigue Strength (MPa)",
        "Poisson's Ratio",
        "Shear Modulus (GPa)",
        "Shear Strength (MPa)",
        "Tensile Strength (Yield) (MPa)",
        "Tensile Strength (Ultimate) (MPa)",
        "Tensile Strength (Break) (MPa)",
        "Flexural Modulus (GPa)",
        "Flexural Strength (MPa)",
        "Izod Impact Strength (J/m)",
        "Charpy Impact Strength (J/m^2)",
    ],
    Thermal: [
        "Latent Heat of Fusion (J/g)",
        "Maximum Mechanical Temperature (°C)",
        "Melting Onset (°C)",
        "Melting Completion (°C)",
        "Specific Heat Capacity (J/(kg × °C))",
        "Thermal Conductivity (W/(m × °C))",
        "Thermal Expansion (%/°C)",
        "Heat Deflection (@66 PSI) (°C)",
        "Glass Transition Temperature (°C)",
    ],
};
type ToggleableColumnTableProps = {
    columns?: any[];
    getToggleHideAllColumnsProps?: (...args: any[]) => any;
};
export function ToggleableColumnTable({ columns, getToggleHideAllColumnsProps, }: ToggleableColumnTableProps) {
    let jsx_map = {};
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    columns.forEach((column) => (jsx_map[column.id] = (<div key={column.id}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <label>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <input type="checkbox" {...column.getToggleHiddenProps()}/>{" "}
            {column.id}
          </label>
        </div>)));
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<table className="table is-narrow is-hoverable is-fullwidth">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <tr>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <th colSpan={3}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()}/> Toggle
          All
        </th>
      </tr>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <tr>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <th>Basic Properties</th>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <th>Mechanical Properties</th>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <th>Thermal Properties</th>
      </tr>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {zip(groups["Basic"], groups["Mechanical"], groups["Thermal"]).map(([b, m, t]) => (<tr key={b + m + t}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <td>{jsx_map[b]}</td>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <td>{jsx_map[m]}</td>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <td>{jsx_map[t]}</td>
          </tr>))}
    </table>);
}
