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

const updateDiscord = (profile = {}) => {
    connection.query(`UPDATE users SET logged_in_discord = 1, discord_app_id = ? where id = ?`,[profile.id, profile.userId], function (error, results, fields) {
        if (error) throw error;
    });
}


module.exports = { findUser, updateDiscord }