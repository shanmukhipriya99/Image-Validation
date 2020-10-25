const connection = require("../database/db");
const express = require("express");
const fs = require("fs");
const sha256 = require("js-sha256");
const timestamp = require("unix-timestamp");
const multer = require("multer");
const router = new express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/certs");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
// const upload = multer({ storage: storage });
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/)) {
    req.fileValidationError = "Only jpeg, png, and pdf files are allowed!";
    return cb(new Error("Only jpeg, png, and pdf files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter }).array(
  "image",
  10
);

router.post("/cert", (req, res) => {
  // 10 is the limit I've defined for number of uploaded files at once
  // 'image' is the name of our file input field
  let uploaded = "";
  let hash = "";

  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (err) {
      return res.send(err);
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (!req.files) {
      return res.send("No file");
    }
    if (req.files != undefined) {
      // The same as when uploading single images
      // console.log(req.files.length);
      let i = 0;
      for (i; i < req.files.length; i++) {
        uploaded = req.files[i].path;
        const body = fs.readFileSync(req.files[i].path);
        hash = "0x" + sha256(body.toString("base64")); //base64 encoded SHA256 hash
        console.log(req.files[i], "body: ", hash);

        var image = {
          cert: uploaded,
          hash: hash,
          timestamp: timestamp.now(),
        };

        sendToDB(image)
          .then((result) => {
            // console.log(result.affectedRows);
            if (result.affectedRows > 0) {
              return res
                .status(200)
                .send({
                  success: true,
                  message: "Certificate successfully saved!",
                });
            }
          })
          .catch((err) => {
            return res.status(500);
          });
      }
    }
  });
});

function sendToDB(image) {
  return new Promise((resolve, reject) => {
    let query = "INSERT INTO certificates SET ?";
    connection.query(query, image, (err, rows) => {
      if (err) {
        // console.log(image);
        throw new Error(err);
      }
      resolve(rows);
    });
  });
}

module.exports = router;
