import HeadingWithBgImage from "common/components/headings/HeadingWithBgImage";
import Metadata from "common/components/Metadata";
import Material from "common/models/Material";
import { uuid } from "common/tooling/util";
import propTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSortBy, useTable } from "react-table";

import config from "./index";
// @ts-expect-error ts-migrate(6142) FIXME: Module './ToggleableColumnTable' was resolved to '... Remove this comment to see the full error message
import { ToggleableColumnTable } from "./ToggleableColumnTable";

function Table({
  columns,
  data
}: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: [
          "Poisson's Ratio",
          "Brinell Hardness",
          "Rockwell M Hardness",
          "Fatigue Strength (MPa)",
          "Latent Heat of Fusion (J/g)",
          "Melting Completion (°C)",
          "Specific Heat Capacity (J/(kg × °C))",
          "Thermal Conductivity (W/(m × °C))",
          "Thermal Expansion (%/°C)",
          "Heat Deflection (@66 PSI) (°C)",
          "Glass Transition Temperature (°C)",
          "Shear Modulus (GPa)",
          "Shear Strength (MPa)",
          "Charpy Impact Strength (J/m^2)",
          "Tensile Strength (Yield) (MPa)",
          "Tensile Strength (Break) (MPa)",
          "Elongation At Break (%)",
          "Maximum Mechanical Temperature (°C)",
          "Melting Onset (°C)",
        ],
      },
    },
    useSortBy
  );

  return <>
    <ToggleableColumnTable
      columns={allColumns}
      // @ts-expect-error ts-migrate(2588) FIXME: Cannot assign to 'getToggleHideAllColumnsProps' be... Remove this comment to see the full error message
      getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
    />
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="table-container">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'table'.
      <table
        {...getTableProps()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
        className="table is-narrow is-hoverable is-fullwidth is-bordered sticky"
      >
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'thead'.
        <thead>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
          {headerGroups.map((headerGroup: any) => <tr {...headerGroup.getHeaderGroupProps()} key={uuid()}>
            // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'headerGroup'. Did you mean 'head... Remove this comment to see the full error message
            {headerGroup.headers.map((column: any) => <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'key'.
              key={uuid()}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
              className="has-text-centered"
            >
              // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'column'. Did you mean 'columns'?
              {column.render("Header")}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
              <span>
                // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                {column.isSorted
                  ? // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'column'.
                    column.isSortedDesc
                    ? " 🠗"
                    : " 🠕"
                  : ""}
              </span>
            </th>)}
          </tr>)}
        </thead>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tbody'.
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
              <tr {...row.getRowProps()} key={uuid()}>
                {row.cells.map((cell: any) => {
                  return (
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    <td
                      {...cell.getCellProps()}
                      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'key'.
                      key={uuid()}
                      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
                      className="has-text-centered"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>;
}

Table.propTypes = {
  columns: propTypes.any,
  data: propTypes.any,
};

export default function Materials() {
  const columns = [
    {
      Header: "Material",
      columns: [
        {
          Header: "Material",
          accessor: (m: any) => m.material,
        },
        {
          Header: "Name",
          accessor: (m: any) => m.name,
        },
      ],
    },
    {
      Header: "Mechanical",
      columns: [
        {
          Header: "Density (g/cm³)",
          accessor: (m: any) => m.mechanical?.density?.to("g/cm3").scalar.toFixed(1),
        },
        {
          Header: "Brinell Hardness",
          accessor: (m: any) => m.mechanical?.brinellHardness,
        },
        {
          Header: "Rockwell M Hardness",
          accessor: (m: any) => m.mechanical?.rockwellMHardness,
        },
        {
          Header: "Tensile Modulus (GPa)",
          accessor: (m: any) => m.mechanical?.tensileModulus?.to("GPa").scalar.toFixed(1),
        },
        {
          Header: "Elongation At Break (%)",
          accessor: (m: any) => m.mechanical?.elongationAtBreak,
        },
        {
          Header: "Fatigue Strength (MPa)",
          accessor: (m: any) => m.mechanical?.fatigueStrength?.to("MPa").scalar.toFixed(1),
        },
        {
          Header: "Poisson's Ratio",
          accessor: (m: any) => m.mechanical?.poissonsRatio,
        },
        {
          Header: "Shear Modulus (GPa)",
          accessor: (m: any) => m.mechanical?.shearModulus?.to("GPa").scalar.toFixed(1),
        },
        {
          Header: "Shear Strength (MPa)",
          accessor: (m: any) => m.mechanical?.shearStrength?.to("MPa").scalar.toFixed(1),
        },
        {
          Header: "Tensile Strength (Yield) (MPa)",
          accessor: (m: any) => m.mechanical?.tensileStrengthYield?.to("MPa").scalar.toFixed(1),
        },
        {
          Header: "Tensile Strength (Ultimate) (MPa)",
          accessor: (m: any) => m.mechanical?.tensileStrengthUltimate?.to("MPa").scalar.toFixed(1),
        },
        {
          Header: "Tensile Strength (Break) (MPa)",
          accessor: (m: any) => m.mechanical?.tensileStrengthBreak?.to("MPa").scalar.toFixed(1),
        },
        {
          Header: "Flexural Modulus (GPa)",
          accessor: (m: any) => m.mechanical?.flexuralModulus?.to("GPa").scalar.toFixed(1),
        },
        {
          Header: "Flexural Strength (MPa)",
          accessor: (m: any) => m.mechanical?.flexuralStrength?.to("MPa").scalar.toFixed(1),
        },
        {
          Header: "Izod Impact Strength (J/m)",
          accessor: (m: any) => m.mechanical?.impactNotchedIzod?.to("J/m").scalar.toFixed(),
        },
        {
          Header: "Charpy Impact Strength (J/m^2)",
          accessor: (m: any) => m.mechanical?.impactCharpy?.to("J/m^2").scalar.toFixed(),
        },
      ],
    },
    {
      Header: "Thermal",
      columns: [
        {
          Header: "Latent Heat of Fusion (J/g)",
          accessor: (m: any) => m.thermal?.latentHeatOfFusion?.to("J/g").scalar.toFixed(0),
        },
        {
          Header: "Maximum Mechanical Temperature (°C)",
          accessor: (m: any) => m.thermal?.maximumTemperatureMechanical
            ?.to("degC")
            .scalar.toFixed(0),
        },
        {
          Header: "Melting Onset (°C)",
          accessor: (m: any) => m.thermal?.meltingOnset?.to("degC").scalar.toFixed(0),
        },
        {
          Header: "Melting Completion (°C)",
          accessor: (m: any) => m.thermal?.meltingCompletion?.to("degC").scalar.toFixed(0),
        },
        {
          Header: "Specific Heat Capacity (J/(kg × °C))",
          accessor: (m: any) => m.thermal?.specificHeatCapacity?.to("J/kg*degC").scalar.toFixed(1),
        },
        {
          Header: "Thermal Conductivity (W/(m × °C))",
          accessor: (m: any) => m.thermal?.thermalConductivity?.to("W/m*degC").scalar.toFixed(1),
        },
        {
          Header: "Thermal Expansion (%/°C)",
          accessor: (m: any) => m.thermal?.thermalExpansion
            ?.mul(100)
            .to("1/degC")
            .scalar.toFixed(4),
        },
        {
          Header: "Heat Deflection (@66 PSI) (°C)",
          accessor: (m: any) => m.thermal?.heatDeflectionAt66Psi?.to("degC").scalar.toFixed(0),
        },
        {
          Header: "Glass Transition Temperature (°C)",
          accessor: (m: any) => m.thermal?.glassTransitionTemperature?.to("degC").scalar.toFixed(0),
        },
      ],
    },
  ];

  const data = Material.getAllMaterials();

  return (
    <>
      // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'Metadata' as a type.
      <Metadata config={config} />
      // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'HeadingWithBgImage' as a typ... Remove this comment to see the full error message
      <HeadingWithBgImage title={config.title} image={config.image} />
      // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'Table' as a type.
      <Table columns={columns} data={data} />
    </>
  );
}
