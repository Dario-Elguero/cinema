
const TYPE = require('../querySql/types');

const userSQL = (query) => {

  switch (query) {
    case TYPE.SELECT_ALL_USERS:
        return `SELECT u.id, u.mail, r.description as rol FROM users as u
                JOIN roles as r ON r.id = u.rol_id
                WHERE deleteAt is null`;

    case TYPE.SELECT_USER_BY_ID:
        return `SELECT u.id, u.mail, r.description as rol, deleteAt FROM users as u
                JOIN roles as r ON r.id = u.rol_id
                WHERE u.id = ?`;

    case TYPE.UPDATE_USER:
        return `UPDATE users SET mail = ?, password = ?, rol_id = ?
                WHERE id = ?`;

    case TYPE.DELETE_USER:
        return `UPDATE users SET deleteAt = NOW()
                WHERE id = ? and deleteAt is null`;

    case TYPE.EXIST_USER:
        return `SELECT id FROM users
                WHERE mail = ?`;

    case TYPE.LOGIN_USER:
        return `SELECT id, rol_id as rol FROM users
                WHERE mail = ? AND password = ?`; 

    case TYPE.REGISTER_USER:
        return `INSERT IGNORE INTO users(mail, password, rol_id)
                VALUE (?, ?, ?)`;

    default:
      break;
  }
};

module.exports = userSQL;
