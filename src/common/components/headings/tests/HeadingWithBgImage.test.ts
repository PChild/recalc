import { render, screen } from "@testing-library/react";

import HeadingWithBgImage from "../HeadingWithBgImage";

describe("HeadingWithBgImage", () => {
  test("Should render a title and an image", () => {
    // @ts-expect-error ts-migrate(2709) FIXME: Cannot use namespace 'HeadingWithBgImage' as a typ... Remove this comment to see the full error message
    render(<HeadingWithBgImage title="My Title" image="/media/Motor" />);
    expect(screen.getByText("My Title")).toBeVisible();
    expect(screen.getByTestId("heading-bg-image-div")).toBeVisible();
    expect(screen.getByTestId("heading-bg-image-div")).toHaveStyle(
      `background-image: url(/media/Motor.png)`
    );
  });
});
