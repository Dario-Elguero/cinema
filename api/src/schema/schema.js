const createTableMovies = (connec) => {
    if (connec.config.database !== '') {
      connec.query(
        `CREATE TABLE if not exists movies (
          id INT(11) NOT NULL AUTO_INCREMENT,
          title VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
          year INT(11) NULL DEFAULT NULL,
          image VARCHAR(150) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
          description VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
          country VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
          deleteAt DATE NULL DEFAULT NULL,
          PRIMARY KEY (id) USING BTREE
        )
        COLLATE='latin1_swedish_ci'
        ENGINE=InnoDB;`,
        (error, resultado) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // return;
          }
        }
      );
    }
  };
  
  const createTableUsers = (connec) => {
    if (connec.config.database !== '') {
      connec.query(
        `CREATE TABLE if not exists users (
          id INT(11) NOT NULL AUTO_INCREMENT,
          mail VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
          password VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
          rol_id INT(11) NOT NULL,
          deleteAt DATE NULL DEFAULT NULL,
          PRIMARY KEY (id) USING BTREE,
          UNIQUE INDEX mail (mail) USING BTREE,
          INDEX FK_users_roles1 (rol_id) USING BTREE,
          CONSTRAINT users_ibfk_1 FOREIGN KEY (rol_id) REFERENCES cinema.roles (id) ON UPDATE RESTRICT ON DELETE RESTRICT
        )
        COLLATE='latin1_swedish_ci'
        ENGINE=InnoDB;`,
        (error, resultado) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // return;
          }
        }
      );
    }
  };

  const createTableFavorites = (connec) => {
    if (connec.config.database !== '') {
      connec.query(
        `CREATE TABLE if not exists favorites (
            user_id INT(11) NOT NULL,
            movie_id INT(11) NOT NULL,
            PRIMARY KEY (user_id, movie_id) USING BTREE,
            INDEX movie_id (movie_id) USING BTREE,
            CONSTRAINT favorites_ibfk_1 FOREIGN KEY (user_id) REFERENCES cinema.users (id) ON UPDATE RESTRICT ON DELETE RESTRICT,
            CONSTRAINT favorites_ibfk_2 FOREIGN KEY (movie_id) REFERENCES cinema.movies (id) ON UPDATE RESTRICT ON DELETE RESTRICT
        )
        COLLATE='latin1_swedish_ci'
        ENGINE=InnoDB;`,
        (error, resultado) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // return;
          }
        }
      );
    }
  };

  const createTableGenres = (connec) => {
    if (connec.config.database !== '') {
      connec.query(
        `CREATE TABLE if not exists genres (
            id INT(11) NOT NULL AUTO_INCREMENT,
            description VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
            PRIMARY KEY (id) USING BTREE
        )
        COLLATE='latin1_swedish_ci'
        ENGINE=InnoDB;`,
        (error, resultado) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // return;
          }
        }
      );
    }
  };

  const createTableMovGen = (connec) => {
    if (connec.config.database !== '') {
      connec.query(
        `CREATE TABLE if not exists mov_gen (
            movie_id INT(11) NOT NULL,
            genre_id INT(11) NOT NULL,
            PRIMARY KEY (movie_id, genre_id) USING BTREE,
            INDEX genre_id (genre_id, movie_id) USING BTREE,
            CONSTRAINT mov_gen_ibfk_1 FOREIGN KEY (genre_id) REFERENCES cinema.genres (id) ON UPDATE RESTRICT ON DELETE RESTRICT,
            CONSTRAINT mov_gen_ibfk_2 FOREIGN KEY (movie_id) REFERENCES cinema.movies (id) ON UPDATE RESTRICT ON DELETE RESTRICT
        )
        COLLATE='latin1_swedish_ci'
        ENGINE=InnoDB;`,
        (error, resultado) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // return;
          }
        }
      );
    }
  };

  const createTableRoles = (connec) => {
    if (connec.config.database !== '') {
      connec.query(
        `CREATE TABLE if not exists roles (
            id INT(11) NOT NULL AUTO_INCREMENT,
            description VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
            PRIMARY KEY (id) USING BTREE
        )
        COLLATE='latin1_swedish_ci'
        ENGINE=InnoDB`,
        (error, resultado) => {
          if (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // return;
          }
        }
      );
    }
  };

module.exports = {
    createTableFavorites,
    createTableGenres,
    createTableMovGen,
    createTableMovies,
    createTableRoles,
    createTableUsers
}
