import Heading from "common/components/headings/Heading";
import { LabeledMotorInput } from "common/components/io/inputs/MotorInput";
import { LabeledNumberInput } from "common/components/io/inputs/NumberInput";
import { LabeledQtyInput } from "common/components/io/inputs/QtyInput";
import { LabeledRatioInput } from "common/components/io/inputs/RatioInput";
import { LabeledQtyOutput } from "common/components/io/outputs/QtyOutput";
import Metadata from "common/components/Metadata";
import Measurement from "common/models/Measurement";
import Motor from "common/models/Motor";
import Ratio from "common/models/Ratio";
import {
  QueryableParamHolder,
  queryStringToDefaults,
  stateToQueryString,
} from "common/tooling/query-strings";
import { useEffect, useState } from "react";
import { NumberParam } from "use-query-params";

import config from "./index";
import {
  calculateCurrentDraw,
  CalculateLoadedSpeed,
  CalculateStallDragLoad,
  CalculateTimeToGoal,
  CalculateUnloadedSpeed,
} from "./math";

export default function Intake() {
  const {
    motor: motor_,
    travelDistance: travelDistance_,
    rollerDiameter: rollerDiameter_,
    dragLoad: dragLoad_,
    ratio: ratio_,
    intakeSides: intakeSides_,
    efficiency: efficiency_,
  } = queryStringToDefaults(
    window.location.search,
    {
      motor: Motor.getParam(),
      travelDistance: Measurement.getParam(),
      rollerDiameter: Measurement.getParam(),
      dragLoad: Measurement.getParam(),
      ratio: Ratio.getParam(),
      intakeSides: NumberParam,
      efficiency: NumberParam,
    },
    config.initialState
  );

  // inputs
  const [motor, setMotor] = useState(motor_);
  const [travelDistance, setTravelDistance] = useState(travelDistance_);
  const [rollerDiameter, setRollerDiameter] = useState(rollerDiameter_);
  const [dragLoad, setDragLoad] = useState(dragLoad_);
  const [ratio, setRatio] = useState(ratio_);
  const [intakeSides, setIntakeSides] = useState(intakeSides_);
  const [efficiency, setEfficiency] = useState(efficiency_);

  // Outputs
  const [unloadedSpeed, setUnloadedSpeed] = useState(
    new Measurement(0, "ft/s")
  );
  const [loadedSpeed, setLoadedSpeed] = useState(new Measurement(0, "ft/s"));
  const [timeToGoal, setTimeToGoal] = useState(new Measurement(0, "s"));
  const [currentDraw, setCurrentDraw] = useState(new Measurement(0, "A"));
  const [stallDragLoad, setStallDragLoad] = useState(new Measurement(0, "lb"));

  useEffect(() => {
    setUnloadedSpeed(
      CalculateUnloadedSpeed(motor, rollerDiameter, intakeSides, ratio)
    );

    const loadedSpeed_ = CalculateLoadedSpeed(
      motor,
      rollerDiameter,
      dragLoad,
      ratio,
      intakeSides,
      efficiency
    );
    setLoadedSpeed(loadedSpeed_);
    setTimeToGoal(CalculateTimeToGoal(travelDistance, loadedSpeed_));

    setCurrentDraw(
      calculateCurrentDraw(motor, rollerDiameter, dragLoad, ratio)
    );

    setStallDragLoad(
      CalculateStallDragLoad(motor, rollerDiameter, ratio, efficiency)
    );
  }, [
    motor,
    travelDistance,
    rollerDiameter,
    dragLoad,
    ratio,
    intakeSides,
    efficiency,
  ]);

  return (
    <>
      <Metadata config={config} />
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
            new QueryableParamHolder(
              { rollerDiameter },
              Measurement.getParam()
            ),
            new QueryableParamHolder({ dragLoad }, Measurement.getParam()),
            new QueryableParamHolder({ ratio }, Ratio.getParam()),
            new QueryableParamHolder({ intakeSides }, NumberParam),
            new QueryableParamHolder({ efficiency }, NumberParam),
            new QueryableParamHolder({ version: config.version }, NumberParam),
          ]);
        }}
      />

      <div className="columns">
        <div className="column">
          <LabeledMotorInput
            inputId="motors"
            label="Motors"
            stateHook={[motor, setMotor]}
            choices={Motor.choices}
          />
          <LabeledRatioInput
            inputId="ratio"
            label="Ratio"
            stateHook={[ratio, setRatio]}
          />
          <LabeledNumberInput
            inputId="efficiency"
            label="Efficiency (%)"
            stateHook={[efficiency, setEfficiency]}
          />
          <LabeledQtyInput
            inputId="travelDistance"
            label="Travel Distance"
            stateHook={[travelDistance, setTravelDistance]}
            choices={["in", "ft", "cm", "m"]}
          />
          <LabeledQtyInput
            inputId="rollerDiameter"
            label="Roller Diameter"
            stateHook={[rollerDiameter, setRollerDiameter]}
            choices={["in", "cm"]}
          />
          <LabeledNumberInput
            inputId="intakeSides"
            label="Intake Sides"
            stateHook={[intakeSides, setIntakeSides]}
          />
          <LabeledQtyInput
            inputId="dragLoad"
            label="Drag Load"
            stateHook={[dragLoad, setDragLoad]}
            choices={["lb", "kg", "g"]}
          />
        </div>

        <div className="column">
          <LabeledQtyOutput
            label="Unloaded Speed"
            stateHook={[unloadedSpeed, setUnloadedSpeed]}
            choices={["ft/s", "m/s", "mi/hour", "km/hour"]}
            precision={2}
          />

          <LabeledQtyOutput
            label="Loaded Speed"
            stateHook={[loadedSpeed, setLoadedSpeed]}
            choices={["ft/s", "m/s", "mi/hour", "km/hour"]}
            precision={2}
          />

          <LabeledQtyOutput
            label="Time to goal"
            stateHook={[timeToGoal, setTimeToGoal]}
            choices={["s"]}
            precision={3}
          />
          <LabeledQtyOutput
            label="Current draw"
            stateHook={[currentDraw, setCurrentDraw]}
            choices={["A"]}
            precision={3}
          />
          <LabeledQtyOutput
            label="Stall Drag Load"
            stateHook={[stallDragLoad, setStallDragLoad]}
            choices={["lb", "kg", "g"]}
            precision={3}
          />
        </div>
      </div>
    </>
  );
}
