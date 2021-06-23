import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { ReactChart } from "chartjs-react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'exports.module.scss' or its co... Remove this comment to see the full error message
import styles from "exports.module.scss";

Chart.defaults.font.family = styles.font_family;

ReactChart.register(...registerables, zoomPlugin);

export function Graph(props: any) {
  // @ts-expect-error ts-migrate(2749) FIXME: 'ReactChart' refers to a value, but is being used ... Remove this comment to see the full error message
  return <ReactChart {...props} />;
}
