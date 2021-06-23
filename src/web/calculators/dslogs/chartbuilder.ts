// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'common/tooling/charts' or its ... Remove this comment to see the full error message
import { ChartBuilder, YAxisBuilder } from "common/tooling/charts";
import { isLocalhost } from "common/tooling/util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'exports.module.scss' or its co... Remove this comment to see the full error message
import styles from "exports.module.scss";
import moment from "moment";
import propTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Select from "react-select";
import { decimate } from "web/calculators/dslogs/dataUtils";

const pdpColors = styles.pdp_colors.split(isLocalhost() ? ", " : ",");

const sharedAxisLabel = "Shared";

const buildSharedYBuilder = ({
  value,
  label,
  getter,
  color
}: any) => ({
  value,
  label,
  getYBuilder: ({
    records,
    displayedRecords,
    useAbsoluteTime,
    precision
  }: any) =>
    new YAxisBuilder()
      .setTitleAndId(label)
      .setId(sharedAxisLabel)
      .setColor(color)
      .setData(
        decimate(
          displayedRecords.map((r: any) => ({
            x: useAbsoluteTime
              ? moment(r.time).toDate()
              : moment(r.time).diff(moment(records[0].time), "ms") / 1000.0,

            y: getter(r)
          })),
          precision
        )
      )
      .setDontBuildOptions(true),
});

const options = [
  {
    value: "voltage",
    label: "Voltage",
    getYBuilder: ({
      records,
      displayedRecords,
      useAbsoluteTime,
      precision
    }: any) =>
      new YAxisBuilder()
        .setTitleAndId("Voltage")
        .setDisplayAxis(true)
        .setDraw(true)
        .setMinTicks(4.5)
        .setMaxTicks(13)
        .setColor(YAxisBuilder.chartColor(0))
        .setData(
          decimate(
            displayedRecords.map((r: any) => ({
              x: useAbsoluteTime
                ? moment(r.time).toDate()
                : moment(r.time).diff(moment(records[0].time), "ms") / 1000.0,

              y: r.voltage
            })),
            precision
          )
        )
        .setPosition("left"),
  },
  {
    value: "pdpVoltage",
    label: "PDP Voltage",
    getYBuilder: ({
      records,
      displayedRecords,
      useAbsoluteTime,
      precision
    }: any) =>
      new YAxisBuilder()
        .setTitleAndId("PDP Voltage")
        .setColor(YAxisBuilder.chartColor(1))
        .setData(
          decimate(
            displayedRecords.map((r: any) => ({
              x: useAbsoluteTime
                ? moment(r.time).toDate()
                : moment(r.time).diff(moment(records[0].time), "ms") / 1000.0,

              y: r.pdpVoltage
            })),
            precision
          )
        )
        .setDisplayAxis(true)
        .setDraw(false)
        .setPosition("left"),
  },
  buildSharedYBuilder({
    value: "canUsage",
    label: "CAN Usage (%)",
    getter: (r: any) => r.canUsage * 100,
    color: YAxisBuilder.chartColor(2),
  }),
  buildSharedYBuilder({
    value: "rioCpu",
    label: "RIO CPU (%)",
    getter: (r: any) => r.rioCpu * 100,
    color: YAxisBuilder.chartColor(3),
  }),
  buildSharedYBuilder({
    value: "roundTripTime",
    label: "Latency (ms)",
    getter: (r: any) => r.roundTripTime,
    color: YAxisBuilder.chartColor(4),
  }),
  buildSharedYBuilder({
    value: "wifiDb",
    label: "WiFi db",
    getter: (r: any) => r.wifiDb,
    color: YAxisBuilder.chartColor(5),
  }),
  buildSharedYBuilder({
    value: "pdpCurrent",
    label: "PDP Total Current",
    getter: (r: any) => r.pdpTotalCurrent,
    color: YAxisBuilder.chartColor(0),
  }),
].concat(
  // @ts-expect-error ts-migrate(2569) FIXME: Type 'IterableIterator<number>' is not an array ty... Remove this comment to see the full error message
  [...Array(16).keys()].map((n) => {
    return buildSharedYBuilder({
      value: `pdpCurrent${n}`,
      label: `PDP ${n} Current`,
      getter: (r: any) => r.pdpCurrents[n],
      color: pdpColors[n],
    });
  })
);

export function ChartChooser(props: any) {
  const [selected, setSelected] = props.stateHook;

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div>
      <Select
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'isMulti'.
        isMulti
        // @ts-expect-error ts-migrate(2588) FIXME: Cannot assign to 'options' because it is a constan... Remove this comment to see the full error message
        options={options}
        // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'onChange'. Did you mean 'onchang... Remove this comment to see the full error message
        onChange={setSelected}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'defaultValue'.
        defaultValue={selected}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'placeholder'.
        placeholder={"Select data..."}
      />
    </div>
  );
}

ChartChooser.propTypes = {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
  stateHook: propTypes.arrayOf(propTypes.any, propTypes.func),
};

export function getChartBuilder({
  records,
  displayedRecords,
  useAbsoluteTime,
  precision,
  plotted
}: any) {
  const cb = new ChartBuilder()
    .setPerformanceModeOn(true)
    .setTitle("Title")
    .setXTitle(useAbsoluteTime ? "Time" : "Seconds since log start")
    .setXAxisType(useAbsoluteTime ? "time" : "linear")
    .setMaintainAspectRatio(true)
    .setResponsive(true)
    .setXStartAtZero(!!useAbsoluteTime)
    .addYBuilder(
      new YAxisBuilder()
        .setPosition("right")
        .setDraw(false)
        .setDisplayAxis(true)
        .setTitleAndId(sharedAxisLabel)
        .setMinTicks(0)
        .setMaxTicks(120)
        .setData([])
    );

  if (plotted !== null) {
    plotted.forEach(({
      getYBuilder
    }: any) => {
      cb.addYBuilder(
        getYBuilder({ records, displayedRecords, useAbsoluteTime, precision })
      );
    });
  }

  return cb;
}
