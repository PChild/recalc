// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'imag... Remove this comment to see the full error message
import imagemin from "imagemin";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'imag... Remove this comment to see the full error message
import imageminWebp from "imagemin-webp";

imagemin(["public/media/*"], {
  destination: "public/media",
  plugins: [imageminWebp({ quality: 100 })],
}).then(() => {});
