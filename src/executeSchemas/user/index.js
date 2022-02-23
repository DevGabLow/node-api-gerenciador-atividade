const connection = require("../../util/db")



const findUser = (user = { email: "" }, callback) => {

    connection.query(`SELECT * FROM users u WHERE u.email = '${user.email}'`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            return callback(results[0])
        }
        return callback(null)
    });

}


module.exports = { findUser }