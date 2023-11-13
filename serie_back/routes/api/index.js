const router = require("express").Router();
const apiSeries = require("./series");
const apiUsers = require("./users");
const apiLikes = require("./likes");

router.use("/series", apiSeries);
router.use("/users", apiUsers);
router.use("/likes", apiLikes);

module.exports = router;
