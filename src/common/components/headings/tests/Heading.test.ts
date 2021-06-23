import { fireEvent, render, screen } from "@testing-library/react";

import Heading from "../Heading";

describe("Heading", () => {
  test("Should render a title and a button", () => {
    // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'Heading' as a type.
    render(<Heading title={"My Title"} getQuery={() => {}} />);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-3 arguments, but got 4.
    expect(screen.getByText("My Title")).toBeVisible();
    expect(screen.getByText("Copy link")).toBeVisible();
    expect(screen.getByText("Copy link")).toBeEnabled();
  });

  test("Passes getQuery prop to ShareButton child", () => {
    const f = jest.fn().mockReturnValue("mock return value");
    const write = jest.fn();
    // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'clipboard' because it is a read-... Remove this comment to see the full error message
    navigator.clipboard = {
      writeText: write,
    };

    // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'Heading' as a type.
    render(<Heading title={"My Title"} getQuery={f} />);
    fireEvent.click(screen.getByText("Copy link"));
    expect(f).toHaveBeenCalledTimes(1);
    expect(f).toHaveBeenLastCalledWith();

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenLastCalledWith(
      "http://localhost/?mock return value"
    );
  });
});
