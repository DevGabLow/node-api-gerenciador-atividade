const connection = require("../../util/db")



const findByUserId = (user = { id: null }, callback) => {
    connection.query(`SELECT * FROM report_users u WHERE u.user_id = '${+user.id}' and u.is_deleted is FALSE`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            return callback(results)
        }
       
        return callback([])
    });

}

const deleteReportById = (id = null) =>{
    connection.query(`DELETE FROM report_users WHERE id = '${id}'`,function (error, results, fields) {
        if (error) throw error;
    });
}

const insertReport = (report = {}) =>{
   
    connection.query("INSERT INTO report_users (message, user_id) VALUES (?,?)", [report.message,report.user_id],function (error, results, fields) {
        if (error) throw error;
    });
}


module.exports = { findByUserId, deleteReportById, insertReport }