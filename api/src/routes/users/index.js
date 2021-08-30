/* eslint-disable quotes */
require("dotenv").config();
const { Router } = require("express");
const connection = require("../../connection/connection");
const dataUser = require("../../verify/validUser");
const validId = require("../../verify/validId");
const userSQL = require("../../querySql/userSql");
const TYPE = require("../../querySql/types");
const connect = connection();
// const { connect } = require('../../app')
const router = Router();

router.get("/", (req, res, next) => {
  
  const sql = userSQL(TYPE.SELECT_ALL_USERS);

  connect.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(400).send("Database is empty");
    }
  });
});

router.get("/:id", validId, (req, res, next) => {
  const { id } = req.params;

  const sql = userSQL(TYPE.SELECT_USER_BY_ID);
  console.log(id)
  connect.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Non-existent user");
    }
  });
});

router.put("/:id", validId, (req, res, next) => {
  const { id } = req.params;
  const { mail, password, rolId } = req.body;

  let sql = userSQL(TYPE.EXIST_USER);

  connect.query(sql, [Number(id)], (err, result) => {
    if (err) {
      res.status(500).send("Internal server error - select");
    }
    if (result.length > 0) {
      sql = userSQL(TYPE.UPDATE_USER);

      connect.query(sql, [mail, password, rolId, Number(id)], (err, result) => {
        if (err) {
          res.status(500).send("Internal server error - update");
        }

        if (result.changedRows > 0) {
          res
            .status(200)
            .json({
              Updated: true,
              book: "The User has been updated correctly",
            });
        }
      });
    } else {
      res
        .status(400)
        .send({
          Updated: false,
          Error: "Something was wrong, check that the ID is correct",
        });
    }
  });
});

router.delete("/:id", validId, (req, res, next) => {
  const { id } = req.params;
  let sql = userSQL(TYPE.EXIST_USER);

  connect.query(sql, [Number(id)], (err, result) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    if (result.length > 0) {
      sql = userSQL(TYPE.DELETE_USER);
      connect.query(sql, [Number(id)], (err, result) => {
        if (err) {
          res.status(500).send("Internal server error");
        }

        if (result.changedRows > 0) {
          res
            .status(200)
            .json({ Deleted: true, message: "The User is Deleted correctly" });
        } else {
          res
            .status(400)
            .send({
              Deleted: false,
              Error: "In fact, this User has been previously removed.",
            });
        }
      });
    } else {
      res.status(400).send("ID Nonexistent");
    }
  });
});

module.exports = router;
