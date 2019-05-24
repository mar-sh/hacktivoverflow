const aws = require("aws-sdk");
const crypto = require("crypto");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_S3_REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      console.log(file, 'meta')
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      console.log(file, 'key')
      const original = path.parse(file.originalname).name;
      const hash = crypto
        .createHash("md5")
        .update(original)
        .digest("hex");
      const fullPath = `upload/${hash}-${Date.now()}${path.extname(file.originalname)}`;

      cb(null, fullPath);
    },
  }),
});

const imageUploadAWS = upload.single('file');

module.exports = { imageUploadAWS };
