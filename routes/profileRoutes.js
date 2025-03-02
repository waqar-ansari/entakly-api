const { Router } = require("express");
const { editProfile, getProfile } = require("../controllers/profileControllers");
const router = Router();

router.put("/edit", editProfile);
router.get("/get", getProfile);

module.exports = router;