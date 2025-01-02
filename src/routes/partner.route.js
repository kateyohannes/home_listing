
const express = require("express")
const { 
    getPartner,
    getPartners,
    addPartner,
    addPartnerOffice,
    addPartnerSite,
    // updatePartner,
    deletePartner,
    updatePartnerSite,
    updatePartnerOffice,
    deletePartnerSite,
    deletePartnerOffice,
    findSite

} = require("../controllers/partner.controller")
const router = express.Router()

router.get("/", getPartners)
router.get("/:id", getPartner)

router.get("/site/:site", findSite),

router.post("/add", addPartner),
router.put("/addSite/:id", addPartnerSite)
router.put("/addOffice/:id", addPartnerOffice)
router.put("/updateSite/:id/:site", updatePartnerSite)
router.put("/updateOffice/:id/:office", updatePartnerOffice)
// router.put("/update/:id", updatePartner)
router.delete("/deleteSite/:id/:site", deletePartnerSite)
router.delete("/deleteOffice/:id/:office", deletePartnerOffice)
router.delete("/delete/:id", deletePartner)

module.exports = router