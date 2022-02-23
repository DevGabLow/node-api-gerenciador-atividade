const express = require('express');
const { findByUserId, deleteReportById, insertReport } = require('../../executeSchemas/report');
const router = express.Router();




router.get('/byuserid/:id', (req,res)=>{
    const id = req.params.id;
    if(+id){
         findByUserId({id:req.params.id}, (result)=>{
                 return res.json(result)
         })
    }else{
        res.json({})
    }
})

router.delete('/byid/:id', (req,res)=>{
    const id = req.params.id;
    if(+id){
        try {
            deleteReportById(req.params.id);
            res.status(200).json({message: `DELETADO COM SUCESSO`})
        } catch (error) {
            res.status(500).json({status:500,message: `Houve um problema ao tentar deletar`})
        }
    }
})

router.post('/insertreport', (req,res)=>{
    const report = req.body.report;
    console.log(report)
    if(report){
        try {
            insertReport(report);
            res.status(200).json({message: `DELETADO COM SUCESSO`})
        } catch (error) {
            res.status(500).json({status:500,message: `Houve um problema ao tentar deletar`})
        }
    }
})

module.exports = router