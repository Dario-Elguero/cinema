/* eslint-disable quotes */
require("dotenv").config();
const { Router } = require("express");
const connection = require("../../connection/connection");
const validId = require("../../verify/validId");
const verifyToken = require("../../verify/validToken");
const validMovies = require("../../verify/validMovies");
const TYPE = require("../../querySql/types");
const movieSQL = require("../../querySql/moviesSql");
const connect = connection();

const router = Router();

const structureMovie = (result) => {
  let movies = [];
  let exist;
  const structure = result.map((movie) => {
    exist = movies.find((mov) => mov.id === movie.id);
    if (!exist) {
      movies.push({
        id: movie.id,
        title: movie.title,
        image: movie.image,
        year: movie.year,
        country: movie.country,
        description: movie.descrip_movie,
        genre: [
          {
            id: movie.genre_id,
            description: movie.descrip_genre,
          },
        ],
      });
    } else {
      exist.genre.push({
        id: movie.genre_id,
        description: movie.descrip_genre,
      });
    }
  });

  return movies;
};

router.get("/", (req, res, next) => {
  let accept = req.headers["x-access-token"];
  console.log(accept);
  const sql = movieSQL(TYPE.SELECT_ALL_MOVIES);

  connect.query(sql, (err, result) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    if (result.length > 0) {
      const structure = structureMovie(result);
      res.status(200).json(structure);
    } else {
      res.status(400).send("Database is empty");
    }
  });
});

router.get("/:id", validId, (req, res, next) => {
  const { id } = req.params;

  const sql = movieSQL(TYPE.SELECT_MOVIE_BY_ID);

  connect.query(sql, [Number(id)], (err, result) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    if (result.length > 0) {
      const structure = structureMovie(result);
      res.status(200).json(structure);
    } else {
      res.status(404).send("ID Nonexistent");
    }
  });
});

router.put("/:id", validId, verifyToken, validMovies, (req, res, next) => {
  if (req.userRol === 1) {
    const { id } = req.params;
    const { title, image, year, description, country, genres } = req.body;

    let sql = movieSQL(TYPE.UPDATE_MOVIE);

    connect.query(
      sql,
      [title, image, year, description, country, Number(id)],
      (err, result) => {
        if (err) {
          res.status(500).send("Internal server error");
        }

        if (result.changedRows > 0) {
          res.status(200).json({
            Updated: true,
            book: "The movie has been updated correctly",
          });
        } else if (result.affectedRows === 0) {
          res.status(400).json({
            Updated: false,
            Error: "Something was wrong, check that the ID is correct",
          });
        } else {
          res.status(300).json({
            Updated: false,
            message: "there were no changes in the data",
          });
        }
      }
    );
  } else {
    res
      .status(400)
      .json({ Updated: false, Error: "Only administrators can modify movies" });
  }
});

router.delete("/:id", validId, verifyToken, (req, res, next) => {
  if (req.userRol === 1) {
    const { id } = req.params;
    let sql = movieSQL(TYPE.EXIST_MOVIE);

    connect.query(sql, [Number(id)], (err, result) => {
      if (err) {
        res.status(500).send("Internal server error");
      }
      if (result.length > 0) {
        sql = movieSQL(TYPE.DELETE_MOVIE);
        connect.query(sql, [Number(id)], (err, result) => {
          if (err) {
            res.status(500).send("Internal server error");
          }

          if (result.changedRows > 0) {
            res
              .status(200)
              .json({ Deleted: true, movie: "The movie is Deleted correctly" });
          } else {
            res.status(400).send({
              Deleted: false,
              Error: "In fact, this book has been previously removed.",
            });
          }
        });
      } else {
        res.status(400).send("ID Nonexistent");
      }
    });
  } else {
    res
      .status(400)
      .json({ Updated: false, Error: "Only administrators can delete movies" });
  }
});

router.post("/", verifyToken, (req, res, next) => {
  if (req.userRol === 1) {
    const { title, image, year, description, country, genres } = req.body;
    let value = [];
    let sql = movieSQL(TYPE.INSERT_MOVIE);

    connect.query(
      sql,
      [title, image, year, description, country],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal server error");
        }
        genres.map((genre) => {
          value.push([result.insertId, genre]);
        });
        sql = movieSQL(TYPE.INSERT_GENRE_MOVIE);
        connect.query(sql, [value], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal server error");
          }
          res
            .status(200)
            .json({ Save: true, movie: "The movie is salved", result });
        });
      }
    );
  } else {
    res
      .status(400)
      .json({ Updated: false, Error: "Only administrators can add movies" });
  }
});

module.exports = router;
