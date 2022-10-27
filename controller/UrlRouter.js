const express = require("express");
const router = express.Router();
const URL = require("./functions/UrlFunctions");
const crypto = require("crypto");
// Status Codes
const CREATED = parseInt(process.env.CREATED);
const SERVER_ERROR = parseInt(process.env.INTERNAL_SERVER_ERROR);
const OK = parseInt(process.env.OK);

router.post("/", async (req, res) => {
  const id = crypto.createHash("md5").update(req.body.longURL).digest("hex");
  const short = crypto
    .createHash("md5")
    .update(req.body.longURL)
    .digest("base64")
    .substring(0, 7);
  const url = {
    urlId: id,
    longURL: req.body.longURL,
    shortURL: short,
    created_dt: new Date(),
  };
  await URL.create(url, (error, data) => {
    if (error) {
      console.log(error);
      res.status(SERVER_ERROR).json({ error: "Something went wrong." });
    } else res.status(CREATED).json({ result: data });
  });
});

router.get("/", async (req, res) => {
  await URL.findAll((error, data) => {
    if (error) {
      console.log(error);
      res.status(SERVER_ERROR).json({ error: "Something went wrong." });
    }
    res.status(OK).json({ result: data });
  });
});

router.get("/:shortUrl", async (req, res) => {
  await URL.findByShortURL(req.params.shortUrl, (error, result) => {
    if (error)
      res.status(SERVER_ERROR).json({ error: "Something went wrong." });
    else res.status(OK).json(result[0]);
  });
});

router.delete("/:urlId", async (req, res) => {
  await URL.delete(req.params.urlId, (error, result) => {
    if (error) res.status(SERVER_ERROR).json({ error: error });
    else res.status(OK).json(result);
  });
});

module.exports = router;
