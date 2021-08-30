const TYPE = require('../querySql/types');

const movieSQL = (query) => {
  
  switch (query) {
    case TYPE.SELECT_ALL_MOVIES:
        return `SELECT m.id, m.title, m.description as descrip_movie, m.image, m.year, m.country, g.id as genre_id, g.description as descrip_genre
                FROM movies as m
                INNER JOIN mov_gen AS mg on mg.movie_id = m.id
                INNER JOIN genres AS g on g.id = mg.genre_id` // `SELECT books.id, books.name, isbn, author_id, authors.name as author_name, country FROM books inner Join authors WHERE authors.id = books.author_id AND books.deleteAt is null`;

    case TYPE.SELECT_MOVIE_BY_ID:
        return `SELECT m.id, m.title, m.description as descrip_movie, m.image, m.year, g.id as genre_id, g.description as descrip_genre
                FROM movies as m
                INNER JOIN mov_gen AS mg on mg.movie_id = m.id
                INNER JOIN genres AS g on g.id = mg.genre_id
                WHERE m.id = ?`;

    case TYPE.UPDATE_MOVIE:
        return `UPDATE movies SET title = ?, image = ?, year = ?, description = ?, country = ?
                WHERE id = ?`;

    case TYPE.DELETE_MOVIE:
        return `UPDATE movies SET deleteAt = NOW()
                WHERE id = ? and deleteAt is null`;

    case TYPE.INSERT_MOVIE:
        return `INSERT INTO movies(title, image, year, description, country)
                VALUES (?, ?, ?, ?, ?)`;
    
    case TYPE.INSERT_GENRE_MOVIE:
        return `INSERT INTO mov_gen(movie_id, genre_id)
                VALUES ?`;

    case TYPE.EXIST_MOVIE:
        return `SELECT id FROM movies
                WHERE id = ?`;

    default:
      break;
  }
};

module.exports = movieSQL;
