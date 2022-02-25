const express = require('express');
const { reportMainExecute } = require('../../executeSchemas/report_main');
const router = express.Router();

router.post('/insertreportmain', (req, res) => {
    const reportMain = req.body.reportmain;
    reportMainExecute.insertReportMain(reportMain);
})

router.get('/user/:id', (req, res) => {
    const id = req.params.id;

    if (+id) {
        reportMainExecute.findByUserId(id, (result) => {
            return res.json(result)
        });
    } else {
        return res.json(null)
    }
})


module.exports = router