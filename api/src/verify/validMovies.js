const validMovies = (req, res, next) => {
  const {
    title,
    image,
    year,
    description,
    country,
    genres
  } = req.body;

  if (!(title && image && year && description && country)) {
    return res.status(400).send("Verify, there can be no empty mandatory fields");
  }

  if (title.length > 50 || country.length > 50) {
    return res.status(400).send(`The length of the title or country must not exceed 50 characters`);
  }

  if (description.length > 250) {
    return res.status(400).send(`The length of the description must not exceed 250 characters`);
  }

  if (description.length > 150) {
    return res.status(400).send(`The length of Url image must not exceed 150 characters`);
  }

  if(typeof year !== 'number'){
    return res.status(400).send(`The year field must be numeric`);
  }

  if(genres.length === 0){
    return res.status(400).send(`Minimum has to have a gender assigned`);
  }

  next();
};

module.exports = validMovies;
