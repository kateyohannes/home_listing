
const express = require("express")
const {
    getUser,
    getUsers,
    addUser,
    setProfile,
    deleteUser
} = require("../controllers/user.controller")

const router = express.Router()

router.get("/:id", getUser);
router.get("/", getUsers);
router.post("/register", addUser);
router.put("/profile/:id", setProfile)
router.delete("/delete/:id", deleteUser);

module.exports = router;
