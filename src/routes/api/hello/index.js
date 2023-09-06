const router = require("express").Router();
const handleHello = require("../../../handlers/handleHello");

router.get("/hello", handleHello);

module.exports = router;
