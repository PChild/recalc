const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");

const sslRedirect = (env: any, status: any) => {
  env = env || ["production"];
  status = status || 302;

  return (req: any, res: any, next: any) => {
    if (env.indexOf(process.env.NODE_ENV) >= 0) {
      if (req.headers["x-forwarded-proto"] !== "https") {
        res.redirect(status, "https://" + req.hostname + req.originalUrl);
      } else {
        next();
      }
    } else {
      next();
    }
  };
};

const app = express();

// @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
app.use(sslRedirect());

app.use(
  expressStaticGzip(path.join(__dirname, "../../build"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
  })
);

app.get("*", function (req: any, res: any) {
  res.sendFile("index.html", { root: path.join(__dirname, "../../build/") });
});

app.listen(process.env.PORT || 5000);
