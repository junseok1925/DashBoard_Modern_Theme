const express = require("express");
const router = express.Router();
const request = require("request");
const client = require("@jsreport/nodejs-client")("http://14.63.184.15:5488", "admin", "1234");
const fs = require("fs");
const path = require("path");

async function render() {
  const res = await client.render({
    template: {
      content: "hello {{someText}}",
      recipe: "chrome-pdf",
      engine: "handlebars",
    },
    data: { someText: "world!!" },
  });

  //console.log(res.headers)
  const bodyBuffer = await res.body();
  // console.log(bodyBuffer.toString())
}

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    //const id = req.body.id;
    const date = req.body.report_date;
    const year = date.slice(0, 4);
    const month = date.slice(4, 7);
    var months = month;
    //console.log(year,month);
    console.log("reportback");
    if (month < 10) {
      months = "0" + month;
    }
    //console.log(month);
    const report = await client.render({
      template: { name: "pohang-main", recipe: "chrome-pdf", engine: "handlebars" },
      data: JSON.stringify(data),
    });
    let fileName = "pohang" + year + month + ".pdf";
    //console.log(fileName);
    var filePathName = path.join(__dirname, "../report/" + fileName);
    const bodyBuffer = await report.body();
    fs.writeFile(filePathName, bodyBuffer, function (err) {
      if (err) {
        res.send({
          message: "failed",
        });
      }
      res.send({
        message: "success",
      });
    });
    console.log("reportend");

    // res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
