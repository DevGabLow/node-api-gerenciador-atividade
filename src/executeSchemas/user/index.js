const connection = require("../../util/db")

const rowDefine = {
    columName: 'users',
    parents: {
        id: "id",
        email: "email",
        logged_in_discord:"logged_in_discord",
        discord_app_id: "discord_app_id"
    }
};

const findUser = (user = { email: "" }, callback) => {
    connection.query(`SELECT * FROM ${rowDefine.columName} u WHERE u.${rowDefine.parents.email} = ?`,[user.email], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            return callback(results[0])
        }
        return callback(null)
    });
}

const updateDiscord = (profile = {}) => {
    connection.query(`UPDATE ${rowDefine.columName} SET ${rowDefine.parents.logged_in_discord} = 1, ${rowDefine.parents.discord_app_id} = ? where ${rowDefine.parents.id} = ?`,
    [profile.id, profile.userId], function (error, results, fields) {
        if (error) throw error;
    });
}


module.exports = { findUser, updateDiscord }