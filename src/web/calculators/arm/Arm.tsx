import Heading from "common/components/headings/Heading";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/MotorInput' wa... Remove this comment to see the full error message
import { LabeledMotorInput } from "common/components/io/inputs/MotorInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/PatientNumberI... Remove this comment to see the full error message
import { LabeledPatientNumberInput } from "common/components/io/inputs/PatientNumberInput";
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
import { cleanAngleInput } from "common/tooling/math";
import {
  QueryableParamHolder,
  queryStringToDefaults,
  stateToQueryString,
} from "common/tooling/query-strings";
import { objectify, unobjectify } from "common/tooling/util";
import { defaultAssignment } from "common/tooling/versions";
import { useEffect, useState } from "react";
import { NumberParam } from "use-query-params";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'workerize-loader!web/calculato... Remove this comment to see the full error message
import worker from "workerize-loader!web/calculators/arm/math";

import { ArmGraphConfig } from "./ArmGraphConfig";
import config from "./index";
import { buildDataForAccessorVsTime } from "./math";

let instance = worker();

export default function Arm() {
  const {
    motor: motor_,
    ratio: ratio_,
    comLength: comLength_,
    armMass: armMass_,
    currentLimit: currentLimit_,
    startAngle: startAngle_,
    endAngle: endAngle_,
    iterationLimit: iterationLimit_,
  } = queryStringToDefaults(
    window.location.search,
    {
      motor: Motor.getParam(),
      ratio: Ratio.getParam(),
      comLength: Measurement.getParam(),
      armMass: Measurement.getParam(),
      currentLimit: Measurement.getParam(),
      startAngle: Measurement.getParam(),
      endAngle: Measurement.getParam(),
      iterationLimit: NumberParam,
    },
    config.initialState,
    defaultAssignment
  );

  // Inputs
  const [motor, setMotor] = useState(motor_);
  const [ratio, setRatio] = useState(ratio_);
  const [comLength, setComLength] = useState(comLength_);
  const [armMass, setArmMass] = useState(armMass_);
  const [currentLimit, setCurrentLimit] = useState(currentLimit_);
  const [startAngle, setStartAngle] = useState(startAngle_);
  const [endAngle, setEndAngle] = useState(endAngle_.round(10));
  const [iterationLimit, setIterationLimit] = useState(iterationLimit_);

  // Outputs
  const [timeToGoal, setTimeToGoal] = useState(new Measurement(0, "s"));
  const [timeIsCalculating, setTimeIsCalculating] = useState(true);

  const [rawChartData, setRawChartData] = useState([]);

  useEffect(() => {
    instance
      .calculateState(
        objectify({
          motor,
          ratio,
          comLength,
          armMass,
          currentLimit,
          startAngle: cleanAngleInput(startAngle),
          endAngle: cleanAngleInput(endAngle),
          iterationLimit,
        })
      )
      .then((result: any) => {
        result = result.map((r: any) => unobjectify(r));
        setTimeIsCalculating(false);

        if (result.length > 0) {
          setTimeToGoal(result[result.length - 1].time);
        } else {
          setTimeToGoal(new Measurement(0, "s"));
        }

        setRawChartData(
          buildDataForAccessorVsTime(result, (s: any) => s.current.scalar, false)
        );
      });

    setTimeIsCalculating(true);
  }, [
    motor,
    ratio,
    comLength,
    armMass,
    currentLimit,
    startAngle,
    endAngle,
    iterationLimit,
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
            new QueryableParamHolder({ version: config.version }, NumberParam),
            new QueryableParamHolder({ motor }, Motor.getParam()),
            new QueryableParamHolder({ ratio }, Ratio.getParam()),
            new QueryableParamHolder({ comLength }, Measurement.getParam()),
            new QueryableParamHolder({ armMass }, Measurement.getParam()),
            new QueryableParamHolder({ currentLimit }, Measurement.getParam()),
            new QueryableParamHolder({ startAngle }, Measurement.getParam()),
            new QueryableParamHolder({ endAngle }, Measurement.getParam()),
            new QueryableParamHolder({ iterationLimit }, NumberParam),
          ]);
        }}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="columns">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column is-half">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledMotorInput
            inputId="motors"
            stateHook={[motor, setMotor]}
            label={"Motor"}
            choices={Motor.getAllMotors().map((m) => m.name)}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledRatioInput
            inputId="ratio"
            stateHook={[ratio, setRatio]}
            label={"Ratio"}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="comLength"
            stateHook={[comLength, setComLength]}
            label={"CoM Distance"}
            choices={["in", "ft", "cm", "m"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="weight"
            stateHook={[armMass, setArmMass]}
            label={"Arm Mass"}
            choices={["lb", "kg"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            stateHook={[currentLimit, setCurrentLimit]}
            inputId="currentLimit"
            label="Current Limit"
            choices={["A"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="startAngle"
            stateHook={[startAngle, setStartAngle]}
            label={"Start Angle"}
            choices={["deg", "rad"]}
          />{" "}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            inputId="endAngle"
            stateHook={[endAngle, setEndAngle]}
            label={"End Angle"}
            choices={["deg", "rad"]}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledPatientNumberInput
            inputId="iterationLimit"
            stateHook={[iterationLimit, setIterationLimit]}
            label={"Iteration Limit"}
            delay={0.4}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyOutput
            stateHook={[timeToGoal, setTimeToGoal]}
            label={"Time to goal"}
            choices={["s"]}
            precision={3}
            isLoading={timeIsCalculating}
          />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <article className="message is-info">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="message-header">
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p>Note</p>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="message-body">
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              The angles follow the unit circle; i.e.: <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              Upright = 90° <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              Parallel to ground = 0° (right) or 180° (left) <br />
              Downwards = -90° or 270°
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              For example: <br />
              3/4 of a full rotation: start angle of 0°, end angle of 270°.
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              1/4 of a rotation downwards: start angle of 60°, end angle of
              -30°.
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              If you get a result of 0s for time to goal, try increasing
              iteration limit.
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <br />
              This accounts for acceleration, but not deceleration.
            </div>
          </article>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Graph
            type="line"
            options={ArmGraphConfig.options()}
            data={{
              datasets: [
                ArmGraphConfig.dataset({
                  label: "Current Draw (A)",
                  colorIndex: 0,
                  data: rawChartData,
                  id: "y",
                }),
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}
