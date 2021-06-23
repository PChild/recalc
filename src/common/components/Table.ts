import propTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSortBy, useTable } from "react-table";

export default function Table({
  columns,
  data
}: any) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className={"table-container"}>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'table'.
      <table
        {...getTableProps()}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
        className={"table has-text-centered is-fullwidth is-hoverable"}
      >
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'thead'.
        <thead>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
          {headerGroups.map((headerGroup: any) => <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
            // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'headerGroup'. Did you mean 'head... Remove this comment to see the full error message
            {headerGroup.headers.map((column: any) => // Add the sorting props to control sorting. For this example
            // we can add them into the header props
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'key'.
              key={Math.random()}
            >
              // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'column'. Did you mean 'columns'?
              {column.render("Header")}
              // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
              {/* Add a sort direction indicator */}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
              <span>
                // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                {column.isSorted
                  ? // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'column'.
                    column.isSortedDesc
                    ? " 🔽"
                    : " 🔼"
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
              <tr {...row.getRowProps()} key={Math.random()}>
                {row.cells.map((cell: any) => {
                  return (
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    <td {...cell.getCellProps()} key={Math.random()}>
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
  );
}

Table.propTypes = {
  data: propTypes.any,
  columns: propTypes.any,
};
