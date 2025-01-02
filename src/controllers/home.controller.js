
const Home = require("../models/home.model");
const Partner = require("../models/partner.model")

module.exports = {
    getHomes: async (req, res)=>{
        try{
            const data = await Home.find();
            res.status(200).json(data);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getHome: async (req, res)=>{
        try{
            const { id } = req.params;
            const data = await Home.findById(id);
            if(!data){
                return res.status(404).json({
                    message: "Home Not Found!"
                });
            }
            
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    },
    addHome: async (req, res)=>{
        try{
            const body = req.body;
            const partner = await Partner.findOne({ _id: body.owner })

            if(!partner){
                return res.status(404).json({
                    message: "Partner Not Found!"
                });
            }

            const site = partner.sites.find(site=> site._id == body.site)

            if(!site){
                return res.status(404).json({
                    message: "Site Not Found!"
                })
            }

            const data = await Home.create(body);

            return res.status(201).json({
                success: true,
                data
            });
        }catch(err){
            return res.status(500).json(err);
        }
    },
    // updateHome: async (req, req)=>{
    //     try{

    //     }catch(err){
    //         return res.status(500).json(err);
    //     }
    // },
    deleteHome: async (req, res)=>{
        try{
            const { id } = req.params;
            const data = await Home.findByIdAndDelete(id);
            if(!data){
                return res.status(404).json({
                    message: "Home Not Found!"
                });
            }
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    }
}
