import { isLocalhost } from "common/tooling/util";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'exports.module.scss' or its co... Remove this comment to see the full error message
import styles from "exports.module.scss";

const chartColors = styles.chart_colors.split(isLocalhost() ? ", " : ",");

export class GraphConfig {
  static options(scales: any, title: any) {
    return {
      scales: scales,
      elements: {
        point: {
          radius: 0,
        },
      },
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: Object.keys(scales).length > 2,
        },
        title: {
          display: true,
          text: title,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "xy",
          },
          zoom: {
            enabled: true,
            mode: "xy",
            wheel: {
              enabled: true,
            },
          },
        },
      },
    };
  }

  static chartColor(index: any) {
    return chartColors[index];
  }

  static dataset({
    label,
    data,
    colorIndex,
    id
  }: any) {
    return {
      label: label,
      data: data,
      borderColor: GraphConfig.chartColor(colorIndex),
      fill: false,
      cubicInterpolationMode: "monotone",
      yAxisID: id,
    };
  }
}
