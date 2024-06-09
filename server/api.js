const express = require("express");
const router = express.Router();

router.get("/name", (req, res, next) => {
    res.send({body: "Asif Sajjad"});
})

module.exports = router;