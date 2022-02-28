const express = require("express");
const { updateDisconectUserByAdminByUserId } = require("../../executeSchemas/logged_schema");
const { findAllUserConnected, findAllUsers } = require("../../executeSchemas/user");
const { UPDATED_SUCCESS } = require("../../util/messages/errors");
const router = express.Router();

router.get("/desconect/{id}", (req,res) =>{
    updateDisconectUserByAdminByUserId(reqp.params.id);
    res.status(200).json({message: UPDATED_SUCCESS})
})

router.get("/desconect/:id", (req,res) =>{
    updateDisconectUserByAdminByUserId(req.params.id);
    res.status(200).json({message: UPDATED_SUCCESS})
})

router.get("/getalluserconnected", (req,res)=>{
    findAllUserConnected((result)=>{
        res.json(result)
    })
})

router.get("/getalluser", (req,res)=>{
    findAllUsers((result)=>{
        res.json(result)
    })
})



module.exports = router