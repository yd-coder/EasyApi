// 解析token之后，拿到用name和password来获取用户id

const { db } = require('../sql/sql');


function getUserOnlyId(res) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT uuid FROM user WHERE username = ? AND password = ?`;
      db.query(sql, [res.username, res.password], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (result.length > 0) {
          resolve(result[0].uuid);
        } else {
          reject(new Error('User not found.'));
        }
      });
    });
}


module.exports = {
  getUserOnlyId,
};
