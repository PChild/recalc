import HeadingWithBgImage from "common/components/headings/HeadingWithBgImage";
import Metadata from "common/components/Metadata";
import Table from "common/components/Table";
import Filament from "common/models/Filament";
import { useMemo } from "react";
import config from "./index";
export default function Compressors() {
    const data = useMemo(() => Filament.getAllFilaments().map((f) => ({
        name: f.name,
        material: (f as any).material,
        density: (f as any).density.scalar.toFixed(2),
        youngsModulus: (f as any).youngsModulus.to("MPa").scalar.toFixed(0),
        tensileStrength: (f as any).tensileStrength.to("MPa").scalar.toFixed(1),
        bendingStrength: (f as any).bendingStrength === null
            ? ""
            : (f as any).bendingStrength.to("MPa").scalar.toFixed(1),
        charpy: (f as any).charpy === null ? "" : (f as any).charpy.to("kJ/m2").scalar.toFixed(1),
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        sources: (f as any).sources.map((src: any, i: any) => (<a key={i} href={src}>
            [{i + 1}]
          </a>)),
    })), []);
    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Material",
            accessor: "material",
        },
        {
            Header: "Density (g/m³)",
            accessor: "density",
        },
        {
            Header: "Young's Modulus (MPa)",
            accessor: "youngsModulus",
        },
        {
            Header: "Tensile Strength (MPa)",
            accessor: "tensileStrength",
        },
        {
            Header: "Flexural Strength (MPa)",
            accessor: "bendingStrength",
        },
        {
            Header: "Charpy impact strength (kJ/m²)",
            accessor: "charpy",
        },
        {
            Header: "Sources",
            accessor: "sources",
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
          <p className={"block"}>
            Imagine the printed part subject being a rectangular prism printed
            with filament lines in parallel with the long direction of the
            prism.
          </p>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Young%27s_modulus"}>
              Young&apos;s Modulus
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            Essentially a measure of how stiff a material is. The higher the
            Young&apos;s Modulus, the stiffer the material is. See{" "}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://www.youtube.com/watch?v=DLE-ieOVFjI"}>here</a>.
          </p>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Ultimate_tensile_strength"}>
              Tensile Strength
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            The maximum stress that a material can withstand before it breaks.
          </p>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Flexural_strength"}>
              Flexural Strength
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How much stress a print can maintain before plastically deforming
            when attempting to bend the part the long way down the middle.
          </p>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Charpy_impact_test"}>
              Charpy impact strength
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            How much energy is absorbed by the part when struck by a heavy
            pendulum.
          </p>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="title">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <a href={"https://en.wikipedia.org/wiki/Deformation_(engineering)"}>
              Elastic vs Plastic Deformation
            </a>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            Imagine you are pulling on a rubber band. For the most part, the
            rubber band will return to its original shape after you release it.
            This is known as elastic deformation.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            Now suppose you pull a bit harder. It doesn&apos;t break, but you
            stretch it far enough such that it doesn&apos;t return to its
            original state, and is now permanently deformed. This is known as
            plastic deformation.
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className={"block"}>
            Suppose you pull even harder. Now, the rubber band snaps. This is
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            known as a <i>fracture.</i>
          </p>
        </div>
      </section>
    </>);
}
