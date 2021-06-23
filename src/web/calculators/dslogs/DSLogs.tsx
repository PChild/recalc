/* eslint-disable */
// @ts-expect-error ts-migrate(6142) FIXME: Module 'common/components/io/inputs/PatientNumberI... Remove this comment to see the full error message
import { LabeledPatientNumberInput } from "common/components/io/inputs/PatientNumberInput";
import moment from "moment";
import { createRef, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DSLogParser } from "web/calculators/dslogs/parser";
export default function DSLogs() {
    const [records, setRecords] = useState([]);
    const [displayedRecords, setDisplayedRecords] = useState(records);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(1000);
    const [precision, setPrecision] = useState(3);
    const [errors, setErrors] = useState([]);
    const [filename, setFilename] = useState("example.dslog");
    const chartRef = createRef();
    const [chartData, setChartData] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [useAbsoluteTime, setUseAbsoluteTime] = useState(false);
    const [plotted, setPlotted] = useState(null);
    useEffect(() => {
        setDisplayedRecords(records.slice(start, end));
        if (displayedRecords.length === 0) {
            return;
        }
        // const cb = getChartBuilder({
        //   records,
        //   displayedRecords,
        //   useAbsoluteTime,
        //   precision,
        //   plotted,
        // });
        // if (plotted !== null && plotted.length > 0) {
        //   setChartOptions(cb.buildOptions());
        //   setChartData(cb.buildData());
        // }
    }, [
        start,
        end,
        JSON.stringify(displayedRecords),
        precision,
        filename,
        useAbsoluteTime,
        JSON.stringify(plotted),
    ]);
    // File input
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length >= 2) {
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            setErrors(errors.concat(["Please only upload a single file :)"]));
        }
        acceptedFiles.forEach((file: any) => {
            const reader = new FileReader();
            reader.onabort = () => {
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                setErrors(errors.concat([`Aborted reading file - ${file.name}`]));
            };
            reader.onerror = () => {
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                setErrors(errors.concat([`Failed reading file - ${file.name}`]));
            };
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                const parser = new DSLogParser(binaryStr);
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ time: any; }[]' is not assigna... Remove this comment to see the full error message
                setRecords(parser.readRecords());
                setFilename(file.name);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);
    const { getInputProps, fileRejections } = useDropzone({
        onDrop,
        accept: ".dslog",
    });
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return (<>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div>
        {errors.map((e) => {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <div key={e}>{e}</div>;
        })}
        {fileRejections.map((f) => {
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            return <div key={f.file.name}>{f.errors[0].message}</div>;
        })}

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="field file has-name is-fullwidth">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <label className="file-label">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <input className="file-input" {...getInputProps()}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <span className="file-cta">
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <span className="file-icon">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="fas fa-upload"/>
              </span>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <span className="file-label">Choose a file…</span>
            </span>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <span className="file-name">{filename}</span>
          </label>
        </div>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <LabeledPatientNumberInput stateHook={[start, setStart]} label={"Start data index"} inputId={"start"} delay={750}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <LabeledPatientNumberInput stateHook={[end, setEnd]} label={"End data index"} inputId={"end"} delay={750}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <LabeledPatientNumberInput stateHook={[precision, setPrecision]} label={"Data sparsity (1 is most precise)"} inputId={"precision"} delay={750}/>

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="field is-grouped">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className="control is-expanded">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <label className="checkbox">
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <input type="checkbox" onChange={(e) => setUseAbsoluteTime(e.target.checked)}/>
              &nbsp;Use absolute time on X axis
            </label>
          </p>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <p className="control">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button className="button is-info" onClick={() => {
            (chartRef as any).current.chartInstance.resetZoom();
        }}>
              Reset zoom/pan
            </button>
          </p>
        </div>
      </div>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <nav className="level">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="level-item has-text-centered">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="heading">Records</p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="title">{records.length}</p>
            </div>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="level-item has-text-centered">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="heading">Log Date</p>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <p className="title">
                {records.length > 0
            ? moment((records[0] as any).time).format("ddd, MMM D YYYY")
            : "Unknown"}
              </p>
            </div>
          </div>
        </nav>

        {/* <ChartChooser stateHook={[plotted, setPlotted]} /> */}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <br />

        {/* <Line data={chartData} ref={chartRef} options={chartOptions} /> */}
      </div>
    </>);
}
