const express = require('express');
const { findByUserId, deleteReportById, insertReport } = require('../../executeSchemas/report');
const { updateDiscord } = require('../../executeSchemas/user');
const { DELETE_SUCCESS, DELETE_ERROR, INSERT_SUCCESS, INSERT_ERROR } = require('../../util/messages/errors');
const router = express.Router();




router.get('/byuserid/:id', (req, res) => {
    const id = req.params.id;
    if (+id) {
        updateDiscord({id:req.cookies.passId,avatar: req.cookies.avatar, userId: id})
        findByUserId({ id: req.params.id }, (result) => {
            return res.json(result)
        })
    } else {
        res.json({})
    }
})

router.delete('/byid/:id', (req, res) => {
    const id = req.params.id;
    if (+id) {
        try {
            deleteReportById(req.params.id);
            res.status(200).json(DELETE_SUCCESS)
        } catch (error) {
            res.status(500).json(DELETE_ERROR)
        }
    }
})

router.post('/insertreport', (req, res) => {
    const report = req.body.report;
    if (report) {
        try {
            insertReport(report,(result)=>{
                res.status(200).json(result)
            });
        } catch (error) {
            res.status(500).json(INSERT_ERROR)
        }
    }
})

module.exports = router