import Heading from "common/components/headings/Heading";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/ChainInput' wa... Remove this comment to see the full error message
import ChainInput from "common/components/io/inputs/ChainInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/MultiInputLine... Remove this comment to see the full error message
import MultiInputLine from "common/components/io/inputs/MultiInputLine";
import { LabeledNumberInput } from "common/components/io/inputs/NumberInput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/QtyInput' was ... Remove this comment to see the full error message
import { LabeledQtyInput } from "common/components/io/inputs/QtyInput";
import { LabeledNumberOutput } from "common/components/io/outputs/NumberOutput";
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/outputs/QtyOutput' wa... Remove this comment to see the full error message
import { LabeledQtyOutput } from "common/components/io/outputs/QtyOutput";
import Metadata from "common/components/Metadata";
import Measurement from "common/models/Measurement";
import {
  QueryableParamHolder,
  queryStringToDefaults,
  stateToQueryString,
} from "common/tooling/query-strings";
import { useEffect, useMemo, useState } from "react";
import { NumberParam, StringParam } from "use-query-params";

import CheatSheet from "./CheatSheet";
import config from "./index";
import { calculateClosestCenters, teethToPD } from "./math";
import { chainVersionManager } from "./versions";

export default function Chains() {
  // Parse URL params
  const {
    chain: chain_,
    p1Teeth: p1Teeth_,
    p2Teeth: p2Teeth_,
    desiredCenter: desiredCenter_,
    extraCenter: extraCenter_,
  } = queryStringToDefaults(
    window.location.search,
    {
      chain: StringParam,
      p1Teeth: NumberParam,
      p2Teeth: NumberParam,
      desiredCenter: Measurement.getParam(),
      extraCenter: Measurement.getParam(),
    },
    config.initialState,
    chainVersionManager
  );

  // Inputs
  const [chain, setChain] = useState(chain_);
  const [p1Teeth, setP1Teeth] = useState(p1Teeth_);
  const [p2Teeth, setP2Teeth] = useState(p2Teeth_);
  const [desiredCenter, setDesiredCenter] = useState(desiredCenter_);
  const [extraCenter, setExtraCenter] = useState(extraCenter_);

  // Outputs
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"in"' is not assignable to param... Remove this comment to see the full error message
  const [p1Pitch, setP1Pitch] = useState(teethToPD(p1Teeth, chain, "in"));
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"in"' is not assignable to param... Remove this comment to see the full error message
  const [p2Pitch, setP2Pitch] = useState(teethToPD(p2Teeth, chain, "in"));

  const results = useMemo(
    () =>
      calculateClosestCenters(
        chain,
        p1Teeth,
        p2Teeth,
        desiredCenter,
        extraCenter
      ),
    [chain, p1Teeth, p2Teeth, desiredCenter, extraCenter]
  );

  const [smallerCenter, setSmallerCenter] = useState(results.smaller.distance);
  const [smallerTeeth, setSmallerTeeth] = useState(results.smaller.teeth);
  const [largerCenter, setLargerCenter] = useState(results.larger.distance);
  const [largerTeeth, setLargerTeeth] = useState(results.larger.teeth);

  useEffect(() => {
    setP1Pitch(teethToPD(p1Teeth, chain, p1Pitch.units()));
    setP2Pitch(teethToPD(p2Teeth, chain, p2Pitch.units()));
    setSmallerCenter(results.smaller.distance);
    setSmallerTeeth(results.smaller.teeth);
    setLargerCenter(results.larger.distance);
    setLargerTeeth(results.larger.teeth);
  }, [chain, p1Teeth, p2Teeth, desiredCenter, extraCenter]);

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
            new QueryableParamHolder({ chain }, StringParam),
            new QueryableParamHolder({ p1Teeth }, NumberParam),
            new QueryableParamHolder({ p2Teeth }, NumberParam),
            new QueryableParamHolder({ desiredCenter }, Measurement.getParam()),
            new QueryableParamHolder({ extraCenter }, Measurement.getParam()),
            new QueryableParamHolder({ version: config.version }, NumberParam),
          ]);
        }}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className="columns">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ChainInput stateHook={[chain, setChain]} selectId={"chainInput"} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            label="Desired Center"
            stateHook={[desiredCenter, setDesiredCenter]}
            choices={["in", "mm", "cm"]}
            inputId={"desired-center-input"}
            selectId={"desired-center-select"}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <LabeledQtyInput
            label="Extra Center"
            stateHook={[extraCenter, setExtraCenter]}
            choices={["in", "mm", "cm"]}
            inputId={"extra-center-input"}
            selectId={"extra-center-select"}
          />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MultiInputLine label={"Pulley 1"}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledNumberInput
              stateHook={[p1Teeth, setP1Teeth]}
              label="Teeth"
              inputId="p1Teeth-input"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledQtyOutput
              label="PD"
              stateHook={[p1Pitch, setP1Pitch]}
              choices={["in", "mm", "cm"]}
              precision={4}
              inputId="p1Pitch-input"
            />
          </MultiInputLine>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MultiInputLine label={"Pulley 2"}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledNumberInput
              stateHook={[p2Teeth, setP2Teeth]}
              label="Teeth"
              inputId="p2Teeth-input"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledQtyOutput
              label="PD"
              stateHook={[p2Pitch, setP2Pitch]}
              choices={["in", "mm", "cm"]}
              precision={4}
              inputId="p2Pitch-input"
            />
          </MultiInputLine>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MultiInputLine label="Smaller">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledQtyOutput
              stateHook={[smallerCenter, setSmallerCenter]}
              label="Center"
              choices={["in", "mm", "cm"]}
              precision={4}
              inputId="smallerCenterDistance"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledNumberOutput
              stateHook={[smallerTeeth, setSmallerTeeth]}
              label="Links"
              inputId="smallerLinks"
            />
          </MultiInputLine>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MultiInputLine label="Larger">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledQtyOutput
              stateHook={[largerCenter, setLargerCenter]}
              label="Center"
              choices={["in", "mm", "cm"]}
              precision={4}
              inputId="largerCenterDistance"
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <LabeledNumberOutput
              stateHook={[largerTeeth, setLargerTeeth]}
              label="Links"
              inputId="largerLinks"
            />
          </MultiInputLine>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <br />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <article className="message is-warning">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="message-header">
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p>Warning</p>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="message-body">
              VEX has listed the pitch diameter for their #25 chain hex bore &
              1/2&quot; ID sprockets to be slightly less than the formula for a
              sprocket&apos;s pitch diameter. However, their pitch diameters for
              their #25 chain plate sprockets are in agreement with the formula.
              We have published the pitch diameters according to the formula for
              the former group of sprockets. You can view VEX&apos;s numbers{" "}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <a href="https://content.vexrobotics.com/vexpro/pdf/VEXpro-%2325HubSprockets-20171130.PDF">
                on their site.
              </a>{" "}
              We have italicized the contradicting pitch diameters on the table
              to the right.
            </div>
          </article>
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="column">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <CheatSheet />
        </div>
      </div>
    </>
  );
}
