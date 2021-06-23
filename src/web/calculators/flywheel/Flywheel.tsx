import Heading from "common/components/headings/Heading";
import BooleanInput from "common/components/io/inputs/BooleanInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/MotorInput' wa... Remove this comment to see the full error message
import { LabeledMotorInput } from "common/components/io/inputs/MotorInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/MultiInputLine... Remove this comment to see the full error message
import MultiInputLine from "common/components/io/inputs/MultiInputLine";
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
import { BooleanParam, NumberParam } from "use-query-params";
import {
  calculateWindupTime,
  generateChartData,
} from "web/calculators/flywheel/math";

import { FlywheelConfig } from "./flywheelGraph";
import config from "./index";
import { flywheelVersionManager } from "./versions";

export default function Flywheel() {
  // Parse URL params
  const {
    motor: motor_,
    ratio: ratio_,
    radius: radius_,
    targetSpeed: targetSpeed_,
    weight: weight_,
    momentOfInertia: momentOfInertia_,
    useCustomMOI: useCustomMOI_,
  } = queryStringToDefaults(
    window.location.search,
    {
      motor: Motor.getParam(),
      ratio: Ratio.getParam(),
      radius: Measurement.getParam(),
      targetSpeed: Measurement.getParam(),
      weight: Measurement.getParam(),
      momentOfInertia: Measurement.getParam(),
      useCustomMOI: BooleanParam,
    },
    config.initialState,
    flywheelVersionManager
  );

  // Inputs
  const [motor, setMotor] = useState(motor_);
  const [ratio, setRatio] = useState(ratio_);
  const [radius, setRadius] = useState(radius_);
  const [targetSpeed, setTargetSpeed] = useState(targetSpeed_);
  const [weight, setWeight] = useState(weight_);
  const [momentOfInertia, setMomentOfInertia] = useState(momentOfInertia_);
  const [useCustomMOI, setUseCustomMOI] = useState(useCustomMOI_);

  // Outputs
  const [windupTime, setWindupTime] = useState(new Measurement(0, "s"));
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!useCustomMOI) {
      setMomentOfInertia(weight.mul(radius).mul(radius).mul(0.5));
    }
  }, [useCustomMOI, radius, weight]);

  useEffect(() => {
    const newWindupTime = calculateWindupTime(
      momentOfInertia,
      motor.freeSpeed,
      motor.stallTorque,
      motor.quantity,
      ratio,
      targetSpeed
    );

    setWindupTime(newWindupTime);

    const data = generateChartData(
      momentOfInertia,
      motor.freeSpeed,
      motor.stallTorque,
      motor.quantity,
      ratio,
      targetSpeed
    );

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ x: number; y: number; }[]' is ... Remove this comment to see the full error message
    setChartData(data);
  }, [
    motor,
    ratio,
    radius,
    targetSpeed,
    weight,
    momentOfInertia,
    useCustomMOI,
  ]);

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
            new QueryableParamHolder({ ratio }, Ratio.getParam()),
            new QueryableParamHolder({ radius }, Measurement.getParam()),
            new QueryableParamHolder({ targetSpeed }, Measurement.getParam()),
            new QueryableParamHolder({ weight }, Measurement.getParam()),
            new QueryableParamHolder(
              { momentOfInertia },
              Measurement.getParam()
            ),
            new QueryableParamHolder({ useCustomMOI }, BooleanParam),
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
            inputId="motor"
            label={"Motor"}
            stateHook={[motor, setMotor]}
            choices={Motor.choices}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledRatioInput
            label="Ratio"
            inputId="ratio"
            stateHook={[ratio, setRatio]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="targetRpm"
            stateHook={[targetSpeed, setTargetSpeed]}
            choices={["rpm"]}
            label={"Target Flywheel Speed"}
            wideLabel={true}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="radius"
            stateHook={[radius, setRadius]}
            choices={["in", "cm"]}
            label={"Radius"}
            disabled={useCustomMOI}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="weight"
            stateHook={[weight, setWeight]}
            choices={["lb", "kg", "g"]}
            label={"Weight"}
            disabled={useCustomMOI}
          />

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MultiInputLine label="MOI">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledQtyInput
              inputId="moi"
              stateHook={[momentOfInertia, setMomentOfInertia]}
              choices={["lb in^2", "kg m^2"]}
              label={""}
              disabled={!useCustomMOI}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <BooleanInput
              stateHook={[useCustomMOI, setUseCustomMOI]}
              label="Use custom MOI"
              inputId="enableCustomMOI"
            />
          </MultiInputLine>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyOutput
            inputId="windupTime"
            stateHook={[windupTime, setWindupTime]}
            choices={["s"]}
            label={"Windup Time"}
            precision={3}
          />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Graph
            type="line"
            data={{
              labels: ["Lbaels"],
              datasets: [
                FlywheelConfig.dataset({
                  data: chartData,
                  label: "Data",
                  colorIndex: 0,
                  id: "y",
                }),
              ],
            }}
            options={FlywheelConfig.options()}
          />
        </div>
      </div>
    </>
  );
}
