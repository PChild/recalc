import { render, screen } from "@testing-library/react";

import Intake from "../Intake";

const inputs = {
    motors: () => screen.getByLabelText("Motors"),
    travelDistance: () => screen.getByLabelText("Travel Distance"),
    rollerDiameter: () => screen.getByLabelText("Roller Diameter"),
    dragLoad: () => screen.getByLabelText("Drag Load"),
    ratio: () => screen.getByLabelText("Ratio"),
    efficiency: () => screen.getByLabelText("Efficiency (%)"),
    intakeSides: () => screen.getByLabelText("Intake Sides"),
};

const secondaryInputs = {};

const outputs = {
    unloadedSpeed: () => screen.getByLabelText("Unloaded Speed"),
    loadedSpeed: () => screen.getByLabelText("Loaded Speed"),
    timeToGoal: () => screen.getByLabelText("Time to goal"),
    currentDraw: () => screen.getByLabelText("Current draw"),
    stallDragLoad: () => screen.getByLabelText("Stall Drag Load"),
};

describe("Intake tests", () => {
    test("Should see all inputs & outputs", () => {
        render(<Intake />);

        for (const [_, getDiv] of Object.entries({
            ...inputs,
            ...secondaryInputs,
            ...outputs,
        })) {
            expect(getDiv()).toBeVisible();
        }
    });

    test("Inputs are enabled, outputs are disabled", () => {
        render(<Intake />);
        for (const [_, getDiv] of Object.entries(inputs)) {
            expect(getDiv()).toBeEnabled();
        }
        for (const [_, getDiv] of Object.entries(outputs)) {
            expect(getDiv()).toBeDisabled();
        }
    });

    test("Should see initial state", () => {
        render(<Intake />);

        expect(inputs.motors()).toHaveValue(1);
        expect(inputs.travelDistance()).toHaveValue(20);
        expect(inputs.rollerDiameter()).toHaveValue(2);
        expect(inputs.dragLoad()).toHaveValue(10);
        expect(inputs.ratio()).toHaveValue(2);
        expect(inputs.efficiency()).toHaveValue(100);
        expect(inputs.intakeSides().toHaveValue("1"));
        expect(outputs.unloadedSpeed()).toHaveValue("27.84");
        expect(outputs.loadedSpeed()).toHaveValue("24.48");
        expect(outputs.timeToGoal()).toHaveValue("0.068");
        expect(outputs.currentDraw()).toHaveValue("32.286");
        expect(outputs.stallDragLoad().toHaveValue("82.992"));
    });

    test.each("Initial state should change with query string", () => {
        delete global.window.location;
        global.window = Object.create(window);
        global.window.location = {
            search:
                "?dragLoad=%7B%22s%22%3A15%2C%22u%22%3A%22lbs%22%7D&efficiency=60" +
                "&intakeSides=2&motor=%7B%22quantity%22%3A2%2C%22name%22%3A%22775pro%22%7D" +
                "&ratio=%7B%22magnitude%22%3A3%2C%22ratioType%22%3A%22Reduction%22%7D" +
                "&rollerDiameter=%7B%22s%22%3A1%2C%22u%22%3A%22in%22%7D" +
                "&travelDistance=%7B%22s%22%3A30%2C%22u%22%3A%22in%22%7D&version=1",
        };

        render(<Intake />);
        expect(inputs.motors()).toHaveValue(2);
        expect(inputs.travelDistance()).toHaveValue(30);
        expect(inputs.rollerDiameter()).toHaveValue(1);
        expect(inputs.dragLoad()).toHaveValue(15);
        expect(inputs.ratio()).toHaveValue(3);
        expect(inputs.efficiency()).toHaveValue(60);
        expect(inputs.intakeSides().toHaveValue(2));
        expect(outputs.unloadedSpeed()).toHaveValue("54.48");
        expect(outputs.loadedSpeed()).toHaveValue("36.41");
        expect(outputs.timeToGoal()).toHaveValue("0.069");
        expect(outputs.currentDraw()).toHaveValue("27.225");
        expect(outputs.stallDragLoad().toHaveValue("45.230"));
    });
});
