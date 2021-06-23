import { fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import Motor from "common/models/Motor";
import { useState } from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../MotorInput' was resolved to '/home/just... Remove this comment to see the full error message
import { LabeledMotorInput } from "../MotorInput";
describe("Labeled motor input", () => {
    const { result: { current: stateHook }, } = renderHook(() => useState(Motor.NEOs(2)));
    test("Renders", () => {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        render(<LabeledMotorInput stateHook={stateHook} choices={Motor.choices} inputId="motorInput" selectId="motorSelect"/>);
    });
    describe("Input has initial value", () => {
        test("Given 2 NEOs", () => {
            const { result: { current: stateHook }, } = renderHook(() => useState(Motor.NEOs(2)));
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            render(<LabeledMotorInput stateHook={stateHook} choices={Motor.choices} inputId="motorInput" selectId="motorSelect" label="Label"/>);
            expect(screen.getByLabelText("Label")).toHaveValue(2);
            expect(screen.getByTestId("motorSelect")).toHaveValue("NEO");
        });
        test("Given 3 775 pros", () => {
            const { result: { current: stateHook }, } = renderHook(() => useState(Motor._775pros(3)));
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            render(<LabeledMotorInput stateHook={stateHook} choices={Motor.choices} inputId="motorInput" selectId="motorSelect" label="Label"/>);
            expect(screen.getByLabelText("Label")).toHaveValue(3);
            expect(screen.getByTestId("motorSelect")).toHaveValue("775pro");
        });
    });
    describe("Changing field changes state hook", () => {
        test("Number input", () => {
            const { result } = renderHook(() => useState(Motor.Falcon500s(1)));
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            render(<LabeledMotorInput stateHook={result.current} choices={Motor.choices} inputId="motorInput" selectId="motorSelect" label="Label"/>);
            userEvent.clear(screen.getByLabelText("Label"));
            (expect(result.current[0]) as any).toEqualMotor(Motor.Falcon500s(0));
            userEvent.type(screen.getByLabelText("Label"), "4");
            expect(screen.getByLabelText("Label")).toHaveValue(4);
            (expect(result.current[0]) as any).toEqualMotor(Motor.Falcon500s(4));
        });
        test("Motor select", () => {
            const { result } = renderHook(() => useState(Motor.Falcon500s(1)));
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            render(<LabeledMotorInput stateHook={result.current} choices={Motor.choices} inputId="motorInput" selectId="motorSelect" label="Label"/>);
            fireEvent.change(screen.getByTestId("motorSelect"), {
                target: { value: "NEO" },
            });
            expect(screen.getByTestId("motorSelect")).toHaveValue("NEO");
            (expect(result.current[0]) as any).toEqualMotor(Motor.NEOs(1));
        });
    });
});
