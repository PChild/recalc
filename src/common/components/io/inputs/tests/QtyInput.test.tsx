import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import Measurement from "common/models/Measurement";
import { useState } from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../QtyInput' was resolved to '/home/justin... Remove this comment to see the full error message
import { LabeledQtyInput } from "../QtyInput";
describe("Labeled qty input", () => {
    test("Renders", () => {
        const { result: { current: stateHook }, } = renderHook(() => useState(new Measurement(3, "in")));
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        render(<LabeledQtyInput stateHook={stateHook} choices={["in"]} label={"Label"}/>);
        expect(screen.getByLabelText("Label")).toBeVisible();
    });
    test("Input/select have initial value", () => {
        const { result: { current: stateHook }, } = renderHook(() => useState(new Measurement(3, "in")));
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        render(<LabeledQtyInput stateHook={stateHook} choices={["cm", "in", "m"]} label={"Label"} selectId={"Select"}/>);
        expect(screen.getByLabelText("Label")).toHaveValue(3);
        expect(screen.getByTestId("Select")).toHaveValue("in");
    });
    test("Changing number changes state hook", () => {
        const { result } = renderHook(() => useState(new Measurement(3, "in")));
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        render(<LabeledQtyInput stateHook={result.current} choices={["cm", "in", "m"]} label={"Label"} selectId={"Select"}/>);
        userEvent.clear(screen.getByLabelText("Label"));
        (expect(result.current[0]) as any).toEqualMeasurement(new Measurement(0, "in"));
        expect(screen.getByLabelText("Label")).toHaveValue(null);
        userEvent.type(screen.getByLabelText("Label"), "4");
        (expect(result.current[0]) as any).toEqualMeasurement(new Measurement(4, "in"));
        expect(screen.getByLabelText("Label")).toHaveValue(4);
    });
    test("Changing select changes state hook", () => {
        const { result } = renderHook(() => useState(new Measurement(3, "in")));
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        render(<LabeledQtyInput stateHook={result.current} choices={["cm", "in", "m"]} label={"Label"} selectId={"Select"}/>);
        (expect(result.current[0]) as any).toEqualMeasurement(new Measurement(3, "in"));
        expect(screen.getByTestId("Select")).toHaveValue("in");
        userEvent.selectOptions(screen.getByTestId("Select"), "cm");
        (expect(result.current[0]) as any).toBeCloseToMeasurement(new Measurement(1.1811, "in"));
        expect(screen.getByTestId("Select")).toHaveValue("cm");
    });
});
