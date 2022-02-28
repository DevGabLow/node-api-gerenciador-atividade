const connection = require("../../util/db")

const rowDefine = {
    columName: 'report_main',
    parents: {
        id: "id",
        user_id: "user_id",
        is_sent: "is_sent",
        sent_ids: "sent_ids"
    }
};

const findByUserId = ( id = null , callback) => {
    connection.query(`SELECT * FROM ${rowDefine.columName} rm WHERE rm.${rowDefine.parents.user_id} = ? AND DATE_SUB(?, INTERVAL 24 hour) <= rm.created_at `,[id, new Date()], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            return callback(results[0])
        }
        return callback(null)
    });
}

const insertReportMain = (reportMain = {}) => {
    connection.query(`INSERT INTO ${rowDefine.columName} (user_id,is_sent,sent_ids) VALUES (?,?,\'?\')`
    ,[reportMain.user_id, true, reportMain.sent_ids], function (error, results, fields) {
        if (error) throw error;
    });
} 


module.exports = { reportMainExecute: { , insertReportMain} }