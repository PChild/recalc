import Heading from "common/components/headings/Heading";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/MotorInput' wa... Remove this comment to see the full error message
import { LabeledMotorInput } from "common/components/io/inputs/MotorInput";
import { LabeledNumberInput } from "common/components/io/inputs/NumberInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/QtyInput' was ... Remove this comment to see the full error message
import { LabeledQtyInput } from "common/components/io/inputs/QtyInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/RatioInput' wa... Remove this comment to see the full error message
import { LabeledRatioInput } from "common/components/io/inputs/RatioInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/outputs/QtyOutput' wa... Remove this comment to see the full error message
import { LabeledQtyOutput } from "common/components/io/outputs/QtyOutput";
import Metadata from "common/components/Metadata";
import Measurement from "common/models/Measurement";
import Motor from "common/models/Motor";
import Ratio from "common/models/Ratio";
import { Graph } from "common/tooling/graph";
import {
  QueryableParamHolder,
  queryStringToDefaults,
  stateToQueryString,
} from "common/tooling/query-strings";
import { useEffect, useState } from "react";
import { NumberParam } from "use-query-params";

import config from "./index";
import { LinearMechGraphConfig } from "./linearMechGraph";
import {
  calculateCurrentDraw,
  CalculateLoadedSpeed,
  CalculateTimeToGoal,
  CalculateUnloadedSpeed,
  generateCurrentDrawChartData,
  generateTimeToGoalChartData,
} from "./math";
import { linearVersionManager } from "./versions";

export default function LinearMech() {
  const {
    motor: motor_,
    travelDistance: travelDistance_,
    spoolDiameter: spoolDiameter_,
    load: load_,
    ratio: ratio_,
    efficiency: efficiency_,
  } = queryStringToDefaults(
    window.location.search,
    {
      motor: Motor.getParam(),
      travelDistance: Measurement.getParam(),
      spoolDiameter: Measurement.getParam(),
      load: Measurement.getParam(),
      ratio: Ratio.getParam(),
      efficiency: NumberParam,
    },
    config.initialState,
    linearVersionManager
  );

  // inputs
  const [motor, setMotor] = useState(motor_);
  const [travelDistance, setTravelDistance] = useState(travelDistance_);
  const [spoolDiameter, setSpoolDiameter] = useState(spoolDiameter_);
  const [load, setLoad] = useState(load_);
  const [ratio, setRatio] = useState(ratio_);
  const [efficiency, setEfficiency] = useState(efficiency_);

  // Outputs
  const [unloadedSpeed, setUnloadedSpeed] = useState(
    new Measurement(0, "ft/s")
  );
  const [loadedSpeed, setLoadedSpeed] = useState(new Measurement(0, "ft/s"));
  const [timeToGoal, setTimeToGoal] = useState(new Measurement(0, "s"));
  const [timeToGoalChartData, setTimeToGoalChartData] = useState([]);
  const [currentDraw, setCurrentDraw] = useState(new Measurement(0, "A"));
  const [currentDrawChartData, setCurrentDrawChartData] = useState([]);

  useEffect(() => {
    setUnloadedSpeed(CalculateUnloadedSpeed(motor, spoolDiameter, ratio));

    const loadedSpeed_ = CalculateLoadedSpeed(
      motor,
      spoolDiameter,
      load,
      ratio,
      efficiency
    );
    setLoadedSpeed(loadedSpeed_);
    setTimeToGoal(CalculateTimeToGoal(travelDistance, loadedSpeed_));

    setTimeToGoalChartData(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ x: number; y: any; }[]' is not... Remove this comment to see the full error message
      generateTimeToGoalChartData(
        motor,
        travelDistance,
        spoolDiameter,
        load,
        ratio,
        efficiency
      )
    );

    setCurrentDrawChartData(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ x: number; y: any; }[]' is not... Remove this comment to see the full error message
      generateCurrentDrawChartData(motor, spoolDiameter, load, ratio)
    );

    setCurrentDraw(calculateCurrentDraw(motor, spoolDiameter, load, ratio));
  }, [motor, travelDistance, spoolDiameter, load, ratio, efficiency]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Metadata config={config} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Heading
        title={config.title}
        subtitle={`V${config.version}`}
        getQuery={() => {
          return stateToQueryString([
            new QueryableParamHolder({ motor }, Motor.getParam()),
            new QueryableParamHolder(
              { travelDistance },
              Measurement.getParam()
            ),
            new QueryableParamHolder({ spoolDiameter }, Measurement.getParam()),
            new QueryableParamHolder({ load }, Measurement.getParam()),
            new QueryableParamHolder({ ratio }, Ratio.getParam()),
            new QueryableParamHolder({ efficiency }, NumberParam),
            new QueryableParamHolder({ version: config.version }, NumberParam),
          ]);
        }}
      />

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="columns">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledMotorInput
            inputId="motors"
            label="Motors"
            stateHook={[motor, setMotor]}
            choices={Motor.choices}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="travelDistance"
            label="Travel distance"
            stateHook={[travelDistance, setTravelDistance]}
            choices={["in", "ft", "cm", "m"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="spoolDiameter"
            label="Spool diameter"
            stateHook={[spoolDiameter, setSpoolDiameter]}
            choices={["in", "cm"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="linearMechanismLoad"
            label="Load"
            stateHook={[load, setLoad]}
            choices={["lb", "kg", "g"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledRatioInput
            inputId="ratio"
            label="Ratio"
            stateHook={[ratio, setRatio]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledNumberInput
            inputId="efficiency"
            label="Efficiency (%)"
            stateHook={[efficiency, setEfficiency]}
          />

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyOutput
            label="Unloaded Speed"
            stateHook={[unloadedSpeed, setUnloadedSpeed]}
            choices={["ft/s", "m/s", "mi/hour", "km/hour"]}
            precision={2}
          />

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyOutput
            label="Loaded Speed"
            stateHook={[loadedSpeed, setLoadedSpeed]}
            choices={["ft/s", "m/s", "mi/hour", "km/hour"]}
            precision={2}
          />

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyOutput
            label="Time to goal"
            stateHook={[timeToGoal, setTimeToGoal]}
            choices={["s"]}
            precision={3}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyOutput
            label="Current draw"
            stateHook={[currentDraw, setCurrentDraw]}
            choices={["A"]}
            precision={3}
          />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Graph
            options={LinearMechGraphConfig.options()}
            type="line"
            data={{
              datasets: [
                LinearMechGraphConfig.dataset({
                  colorIndex: 0,
                  data: timeToGoalChartData,
                  id: "y1",
                  label: "Time To Goal (s)",
                }),
                LinearMechGraphConfig.dataset({
                  colorIndex: 1,
                  data: currentDrawChartData,
                  id: "y2",
                  label: "Current (A)",
                }),
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}
