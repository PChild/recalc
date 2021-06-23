// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import sample from "lodash/sample";

export default function Error404() {
  const gifs = [
    "https://thumbs.gfycat.com/PotableClearcutHeterodontosaurus-mobile.mp4",
    "https://i.imgur.com/cv27BaL.mp4",
    "https://i.imgur.com/PxzCKCO.mp4",
    "https://i.imgur.com/iLQ5k4i.mp4",
    "https://i.imgur.com/led15Z7.gif",
    "https://i.imgur.com/bktltGc.gif",
    "https://i.redd.it/zxtkqru6yy811.gif",
  ];

  const gif = sample(gifs);
  let embed = <></>;
  if (gif.endsWith(".mp4")) {
    embed = (
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'video'.
      <video width="500" autoPlay={"autoplay"} muted loop={"true"}>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'source'.
        <source src={gif} type="video/mp4" />
      </video>
    );
  } else if (gif.endsWith(".gif")) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'img'.
    embed = <img src={gif} alt={"Robot falling"} />;
  }

  return (
    <>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div content={"block"}>{embed}</div>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div content={"block"}>You&apos;ve taken a wrong turn :(</div>
    </>
  );
}
