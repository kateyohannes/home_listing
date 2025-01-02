
const Partner = require("../models/partner.model");

module.exports = {
    getPartners: async (req, res) => {
        try {
            const data = await Partner.find();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getPartner: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Partner.findById(id);
            if (!data) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    addPartner: async (req, res) => {
        try {
            const body = req.body;
            const data = await Partner.create(body);
            if (!data) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }
            return res.status(201).json({
                success: true,
                data
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    findSite: async (req, res) => {
        try {
            const { site } = req.params;
            const data = await Partner.findOne({ 'sites._id': site});
            if (!data) {
                return res.status(404).json({
                    message: "Partner Site Not Found!"
                })
            }
            return res.status(200).json(data.site);
        } catch (err) {
            return res.status(500).json(err);
        }
    }, 
    addPartnerSite: async (req, res) => {
        try {
            const { id } = req.params
            const body = req.body
            const partner = await Partner.findOne({ _id: id })
            if (!partner) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }

            partner.sites.push(body)
            const data = await partner.save();
            return res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    addPartnerOffice: async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const partner = await Partner.findOne({ _id: id })
            if (!partner) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }

            const hasMainOffice = partner.offices.find(office => office.type == body.type);
            if (hasMainOffice) {
                return res.status(403).json({
                    message: "It already has main office!"
                })
            }

            partner.offices.push(body)
            const data = await partner.save()
            return res.status(201).json({
                success: true,
                data
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    updatePartnerSite: async (req, res) => {
        try {
            const { id, site } = req.params
            const partner = await Partner.findOne({ _id: id })
            if (!partner) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }

            return res.status(200).json({ partner, site });
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    updatePartnerOffice: async (req, res) => {
        try {
            const { id, office } = req.params

            const partner = await Partner.findOne({ _id: id })
            if (!partner) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }

            return res.status(200).json({ partner, office });
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    deletePartnerSite: async (req, res) => {
        try {
            const { id, site } = req.params

            const partner = await Partner.findOne({ _id : id })
            if (!partner) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }

            const update = await Partner.updateOne(
                { _id: id }, 
                { $pull: 
                    { sites: { 
                            _id: site 
                        } 
                    }
                },
                { new: true}
            );

            return res.status(200).json({ 
                success: true, 
                update 
            });

        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deletePartnerOffice: async (req, res) => {
        try {
            const { id, office } = req.params

            const partner = await Partner.findOne({ _id: id })
            if (!partner) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }

            const update = await Partner.updateOne(
                { _id: id }, 
                { $pull: 
                    { offices: { 
                            _id: office 
                        } 
                    }
                }
            );

            return res.status(200).json({ 
                success: true, 
                update 
            });

        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deletePartner: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await Partner.findByIdAndDelete(id);
            if (!data) {
                return res.status(404).json({
                    message: "Partner Not Found!"
                })
            }
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
