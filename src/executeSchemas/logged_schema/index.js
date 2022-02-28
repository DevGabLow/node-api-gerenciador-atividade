const connection = require("../../util/db")



const rowDefine = {
    columName: 'users_logged_report',
    parents: {
        id: "id",
        session_started_at: "session_started_at",
        token_provider: "token_provider",
        last_activity: "last_activity",
        user_id: "user_id"
    }
};
const loggedSchema = {
    findByUserId: (id = null, callback) => {
        if (!isNaN(+id)) {
            connection.query(`SELECT * FROM ${rowDefine.columName} u WHERE u.${rowDefine.parents.user_id} = ? `, [id], function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    return callback(results[0])
                }
                return callback(null)
            });
        }
    },
    updateAllTableByUserId: (user = {}) => {
        if (user) {
            const now = new Date();
            connection.query(`UPDATE ${rowDefine.columName} SET ${rowDefine.parents.session_started_at} = ?,
                              ${rowDefine.parents.token_provider} = ?,
                              ${rowDefine.parents.last_activity} =  ?
                              WHERE ${rowDefine.parents.user_id} =  ? `, [now, user.token, now, user.id], function (error, results, fields) {
                if (error) throw error;
            });
        }
    },
    updateLastActivityByUserId: (id = null) => {
        if (!isNaN(+id)) {
            const now = new Date();
            connection.query(`UPDATE ${rowDefine.columName} SET ${rowDefine.parents.last_activity} =  ?
                              WHERE ${rowDefine.parents.user_id} =  ? `, [now, id], function (error, results, fields) {
                if (error) throw error;
            });
        }
    },
    insertSessionStart: (user = {}) => {
        if (user) {
            const now = new Date();
            connection.query(`INSERT INTO ${rowDefine.columName} (${rowDefine.parents.token_provider},${rowDefine.parents.user_id})
                              VALUES (?,?)`, [user.token, user.id], function (error, results, fields) {
                if (error) throw error;
            });
        }
    },
    deleteSessionByUserId: (id = null) => {
        if (!isNaN(+id)) {
            connection.query(`DELETE FROM ${rowDefine.columName} WHERE ${rowDefine.parents.user_id} =  ? `, [id], function (error, results, fields) {
                if (error) throw error;
            });
        }
    },
    updateDisconectUserByAdminByUserId: (id = null) => {
        if (!isNaN(+id)) {
            connection.query(`UPDATE ${rowDefine.columName} SET kill_logged_by_admin = 1 WHERE ${rowDefine.parents.user_id} =  ? `, [id], function (error, results, fields) {
                if (error) throw error;
            });
        }
    }
}

module.exports = loggedSchema