
const express = require("express")
const {
    getHome,
    getHomes,
    addHome,
    deleteHome
} = require("../controllers/home.controller")

const router = express.Router()

router.get("/:id", getHome);
router.get("/", getHomes);
router.post("/add", addHome);
router.delete("/delete/:id", deleteHome);

module.exports = router;
