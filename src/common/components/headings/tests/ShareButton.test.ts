import { fireEvent, render, screen } from "@testing-library/react";

import ShareButton from "../ShareButton";

describe("Share button", () => {
  test("Should render a button with text that says copy", () => {
    // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'ShareButton' as a type.
    render(<ShareButton getQuery={() => {}} />);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-3 arguments, but got 4.
    expect(screen.getByText("Copy link")).toBeVisible();
    expect(screen.getByText("Copy link").closest("button")).toBeVisible();
    expect(screen.getByText("Copy link").closest("button")).toBeEnabled();
    expect(screen.getByText("Copy link").closest("button")).toHaveClass(
      "button"
    );
  });

  test("Clicking calls given function in props and writes to clipboard", () => {
    const f = jest.fn().mockReturnValue("mock return value");
    const write = jest.fn();
    // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'clipboard' because it is a read-... Remove this comment to see the full error message
    navigator.clipboard = {
      writeText: write,
    };

    // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'ShareButton' as a type.
    render(<ShareButton getQuery={f} />);
    fireEvent.click(screen.getByText("Copy link"));
    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenLastCalledWith();

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenLastCalledWith(
      "http://localhost/?mock return value"
    );
  });
});
