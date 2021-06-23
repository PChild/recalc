import propTypes from "prop-types";

export default function HeadingWithBgImage(props: any) {
  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="columns">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className="column is-3 title front-text">{props.title}</div>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
        className="column is-9 bg-image"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'data'.
        data-testid={"heading-bg-image-div"}
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
        style={{
          // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
          backgroundImage: `url("${props.image}.png")`,
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'height'.
          height: "100px",
        }}
      />
    </div>
  );
}

HeadingWithBgImage.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
};
