require("dotenv").config();
const { Router } = require("express");
const verifyToken = require("../verify/validToken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSQL = require("../querySql/userSql");
const TYPE = require("../querySql/types");
const connection = require("../connection/connection");
const { SECRET } = process.env;
//const users = require("../users");
const connect = connection();

const router = Router();

router.post("/login", (req, res, next) => {
  let { mail, password } = req.body;
  password = crypto.createHash("sha1").update(password).digest("hex");
  
  let sql = userSQL(TYPE.LOGIN_USER);
  connect.query(sql, [mail, password], (err, result) => {
    if (err) {
      return res.status(500).send("Internal server error 1");
    }
  
    if (result.length > 0) {
      let id = result[0].id
      let rol = result[0].rol
      
      const token = jwt.sign({ id, rol }, SECRET, {
        expiresIn: 60 * 60 * 4,
      });
      return res.status(200).json({ Auth: true, Token: token });
    }else{
      return res.status(405).send("User or Password invalid");
    }
  })
});

router.post("/register", (req, res, next) => {
  let { mail, password, rol } = req.body;
  let sql = userSQL(TYPE.EXIST_USER);
console.log(req.body)
  if (!mail || !password) {
    return res.status(400).send("Invalid empty field");
  }

  connect.query(sql, [mail], (err, result) => {
    if (err) {
      return res.status(500).send("Internal server error 1");
    }
    
    if (result.length === 0) {
      password = crypto.createHash("sha1").update(password).digest("hex");
      sql = userSQL(TYPE.REGISTER_USER);
      connect.query(sql, [mail, password, rol || 2], (err, result) => {
        if (err) {
          res.status(500).send("Internal server error 2");
        }
        
        if (result.affectedRows > 0) {
          res
            .status(200)
            .json({
              Registered: true,
              user: "Registration has been successful",
            });
        } else {
          res
            .status(400)
            .send({ Registered: false, Error: "Failed to register" });
        }
      });
    }else{
      res
        .status(400)
        .send({ Registered: false, Error: "This user is already registered" });
    }
  });
});

module.exports = router;
