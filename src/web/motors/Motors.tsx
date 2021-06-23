import HeadingWithBgImage from "common/components/headings/HeadingWithBgImage";
import Metadata from "common/components/Metadata";
import Table from "common/components/Table";
import Measurement from "common/models/Measurement";
import Motor, { MotorState, nominalVoltage } from "common/models/Motor";
import { measurementMax } from "common/tooling/math";
import { useEffect, useMemo, useState } from "react";
import config from "./index";
const _default = () => new Measurement(0, "W");
const _defaultArray = () => [_default(), _default(), _default()];
const currents = [
    new Measurement(30, "A"),
    new Measurement(40, "A"),
    new Measurement(50, "A"),
];
export default function Motors() {
    const [dataTbl, setDataTbl] = useState({
        "Falcon 500": _defaultArray(),
        NEO: _defaultArray(),
        "775pro": _defaultArray(),
        "NEO 550": _defaultArray(),
        CIM: _defaultArray(),
        MiniCIM: _defaultArray(),
        BAG: _defaultArray(),
        "AM-9015": _defaultArray(),
        NeveRest: _defaultArray(),
        Snowblower: _defaultArray(),
        "775 RedLine": _defaultArray(),
    });
    useEffect(() => {
        Motor.getAllMotors().map((m) => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            let arr = dataTbl[m.name];
            for (let i = 0; i < 3; i++) {
                arr[i] = new MotorState(m, currents[i], {
                    current: currents[i],
                    voltage: nominalVoltage,
                }).solve().power;
            }
            setDataTbl((dt) => ({
                ...dt,
                [m.name]: arr,
            }));
        });
    }, []);
    const data = useMemo(() => Motor.getAllMotors().map((m) => {
        const powerToString = (p: any) => {
            return p.scalar <= 0 ? "-" : p.scalar.toFixed(0);
        };
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const power1 = dataTbl[m.name][0];
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const power2 = dataTbl[m.name][1];
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const power3 = dataTbl[m.name][2];
        let numerator;
        // If, at any of 20/30/40A, the motor blows up, then
        if ([power1, power2, power3].some((element) => element.scalar <= 0)) {
            // For power:weight ratio, consider the max power it can achieve
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
            numerator = measurementMax(m.maxPower, 
            // m.getPower(currents[0]),
            new MotorState(m, currents[0], {
                current: currents[0],
                voltage: nominalVoltage,
            }).solve().power, new MotorState(m, currents[1], {
                current: currents[1],
                voltage: nominalVoltage,
            }).solve().power, new MotorState(m, currents[2], {
                current: currents[2],
                voltage: nominalVoltage,
            }).solve().power);
        }
        else {
            // Otherwise, consider the max power it can achieve at 40A
            numerator = new MotorState(m, currents[2], {
                current: currents[2],
                voltage: nominalVoltage,
            }).solve().power;
        }
        let weightToUse = (m as any).weight;
        if (m.name !== "Falcon 500") {
            weightToUse = weightToUse.add(new Measurement(0.25, "lb"));
        }
        return {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            link: <a href={(m as any).url}>{m.name}</a>,
            freeSpeed: m.freeSpeed.scalar,
            freeCurrent: m.freeCurrent.scalar.toFixed(1),
            stallTorque: m.stallTorque.scalar.toFixed(2),
            stallCurrent: m.stallCurrent.scalar,
            kt: m.kT.scalar.toFixed(4),
            kv: m.kV.scalar.toFixed(1),
            powerAt10A: powerToString(power1),
            powerAt20A: powerToString(power2),
            powerAt40A: powerToString(power3),
            resistance: m.resistance.scalar.toFixed(3),
            weight: weightToUse.scalar.toFixed(2),
            powerToWeight: numerator.div(weightToUse).scalar.toFixed(2),
        };
    }), [JSON.stringify(dataTbl)]);
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "link",
        },
        {
            Header: "Weight (lb)",
            accessor: "weight",
        },
        {
            Header: "Free Speed (RPM)",
            accessor: "freeSpeed",
        },
        {
            Header: "Stall Torque (Nm)",
            accessor: "stallTorque",
        },
        {
            Header: "Stall Current (A)",
            accessor: "stallCurrent",
        },
        {
            Header: "Free Current (A)",
            accessor: "freeCurrent",
        },
        {
            Header: `Peak power at ${currents[0].format()} (W)`,
            accessor: "powerAt10A",
        },
        {
            Header: `Peak power at ${currents[1].format()} (W)`,
            accessor: "powerAt20A",
        },
        {
            Header: `Peak power at ${currents[2].format()} (W)`,
            accessor: "powerAt40A",
        },
        {
            Header: "Peak power : weight ratio (W/lb)",
            accessor: "powerToWeight",
        },
        {
            Header: "Resistance (Ω)",
            accessor: "resistance",
        },
        {
            Header: "kT (Nm/A)",
            accessor: "kt",
        },
        {
            Header: "kV (rpm/V)",
            accessor: "kv",
        },
    ], []);
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Metadata config={config}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <HeadingWithBgImage title={config.title} image={config.image}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Table columns={columns} data={data}/>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <section className="section">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="container">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">Explaining these numbers</div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className="block">
            All the data comes directly from or is derived from experimental
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            motor data <a href="https://motors.vex.com/">published by VEX</a> as
            of April 4th, 2021. All motors except for the Falcon 500 have 0.25
            lbs added to their weight to represent the weight of a speed
            controller. VEX has a great introduction to DC motors specs{" "}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://motors.vex.com/introduction"}>here</a>.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Stall_torque"}>
              Stall torque
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How much torque (rotational force) the motor outputs when the shaft
            is locked to zero RPM (which is known as stall).
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">Stall current</div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How much current the motor draws when at stall. Note that there are
            further limitations on current draw implemented in the FRC control
            system, such as PDP breakers or software-implemented current limits.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">Free Current</div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How much current the motor draws when spinning freely at maximum RPM
            under no external load.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Work_(physics)"}>Work</a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How much energy is required to exert a force across a distance. This
            is measured in joules.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Power_(physics)"}>Power</a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How quickly an amount of work can be applied by the motor. Power is
            equal to work divided by time. The maximum power of a DC motor is
            generally found at half of the motor&apos;s maximum RPM.
          </p>{" "}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Motor_constants"}>
              Torque constant (kT) & Velocity constant (kV)
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            These are constants that are intrinsic to the physical construction
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            of the motor. <code>kT</code> defines the relationship between
            current applied and torque output. It can be used to calculate the
            power output of a motor given a speed and current. This is useful to
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            as as FRC robots are often current-limited. <code>kV</code> is the
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            inverse of <code>kT</code>, and can also be defined as the RPM of
            the motor per volt applied.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Electrical_resistance_and_conductance"}>
              Resistance
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            Generally a metric not used in robot design, but is useful to know
            when calculating other properties of the motor. Generally, a lower
            internal resistance will result in a motor that draws less current
            for a given amount of power compared to one with a higher internal
            resistance.
          </p>
        </div>
      </section>
    </>);
}
