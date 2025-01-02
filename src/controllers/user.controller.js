
const User = require("../models/user.model");
const { encrypt } = require("../utils/hash.js")

module.exports = {
    getUsers: async (req, res)=>{
        try{
            const data = await User.find().select("-password");
            res.status(200).json(data);
        }catch(err){
            res.status(500).json(err);
        }
    },
    getUser: async (req, res)=>{
        try{
            const { id } = req.params;
            const data = await User.findById(id).select("-password");
            if(!data){
                return res.status(404).json({
                    message: "User not found!"
                });
            }
            
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    },
    addUser: async (req, res)=>{
        try{
            const body = req.body;
            const { password } = body;
            
            const { hash, salt } = encrypt(password);
            const data = await User.create({
                ...body,
                password: {
                    currentPassword: hash,
                    salt
                }
            });

            if(!data){
                return res.status(404).json({
                    message: "User not found!"
                });
            }

            return res.status(201).json({
                success: true,
                data
            });
        }catch(err){
            return res.status(500).json(err);
        }
    },
    setProfile: async (req, res)=>{
        try{
            const { id } = req.params;
            const body = req.body;
            const user = await User.findOne({ _id: id })
            if(!user){
                return res.status(404).json({
                    message: "User not found!"
                })
            }

            user.profile = body
            const data = await user.save()
            return res.status(201).json(data)
        }catch(err){
            return res.status(500).json(err)
        }
    },
    deleteUser: async (req, res)=>{
        try{
            const { id } = req.params;
            const data = await User.findByIdAndDelete(id);
            if(!data){
                return res.status(404).json({
                    message: "User not found!"
                });
            }
            return res.status(200).json(data);
        }catch(err){
            return res.status(500).json(err);
        }
    }
}
