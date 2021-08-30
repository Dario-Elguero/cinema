
const dataUser = (req, res, next) => {
    const { mail, password } = req.body;
    
    if (!mail || !password) {
        return res.status(400).send(`Fields cannot be empty`);
      }
    
      if (mail.length > 50 || password.length > 50) {
        return res.status(400).send(`The length must not exceed 50 characters`);
      }
    
    next();
    
}

module.exports = dataUser;
