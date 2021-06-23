import { setTitle } from "common/tooling/routing";
import arm from "web/calculators/arm";
import belts from "web/calculators/belts";
import chains from "web/calculators/chains";
// import dslogs from "web/calculators/dslogs";
import flywheel from "web/calculators/flywheel";
import linear from "web/calculators/linear_mech";
import gearload from "web/calculators/load";
import pneumatics from "web/calculators/pneumatics";
import compressors from "web/compressors";
import filaments from "web/filaments";
import Tile from "web/landing/Tile";
import motors from "web/motors";

export default function Landing() {
  setTitle(null);

  return (
    <>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'section'.
      <section className="hero">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
        <div
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
          className="hero-body"
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
          style={{
            // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
            paddingTop: 0,
          }}
        >
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="container">
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h1'.
            <h1 className="title">⎰ReCalc</h1>
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h2'.
            <h2 className="subtitle">
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'A'.
              A collaboration focused mechanical design calculator
            </h2>
          </div>
        </div>
      </section>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'section'.
      <section
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
        className="section"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
        style={{
          // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
          paddingTop: 0,
        }}
      >
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h1'.
        <h1 className="title">Calculators</h1>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
        <div className="columns is-multiline is-gapless">
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile to={belts.url} title={belts.title} image={belts.image} />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile to={chains.url} title={chains.title} image={chains.image} />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
              to={flywheel.url}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
              title={flywheel.title}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'image'.
              image={flywheel.image}
            />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile to={linear.url} title={linear.title} image={linear.image} />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className={"column is-half"}>
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile to={arm.url} title={arm.title} />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className={"column is-half"}>
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
              to={pneumatics.url}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
              title={pneumatics.title}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'image'.
              image={pneumatics.image}
            />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className={"column is-half"}>
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
              to={gearload.url}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
              title={gearload.title}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'image'.
              image={gearload.image}
            />
          </div>
        </div>
      </section>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'section'.
      <section
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
        className="section"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
        style={{
          // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
          paddingTop: 0,
        }}
      >
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h1'.
        <h1 className="title">Information</h1>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
        <div className="columns is-multiline is-gapless">
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
              to={filaments.url}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
              title={filaments.title}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'image'.
              image={filaments.image}
            />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile to={motors.url} title={motors.title} image={motors.image} />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
              to={compressors.url}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
              title={compressors.title}
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'image'.
              image={compressors.image}
            />
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-half">
            // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace
            'Tile' as a type.
            <Tile to="/about" title="About ⎰ReCalc" />
          </div>
        </div>
      </section>
      {/* <section className="section">
        <h1 className="title">Utilities</h1>
        <div className="subtitle">
          <div className="columns is-2 is-variable">
            <div className="column is-half">
              <Tile to={dslogs.url} title={dslogs.title} />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
