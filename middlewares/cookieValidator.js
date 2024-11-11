const jwt = require("jsonwebtoken");

function cookieValidator(req, res, next) {
  const cookie = req.cookies.Token;
  if (!cookie) {
    return res.status(401).send("Unauthorized: No token provided.");
  }
  try {
    const decoded = jwt.verify(cookie, process.env.jwt_secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: Invalid token.");
  }
}

module.exports = {
  cookieValidator,
};

const res = await request(app)
  .post('/login') 
  .send({ email: 'joao@example.com', senha: '123456' });

const token = res.body.token;  

const userRes = await request(app)
  .post('/users')
  .set('Authorization', `Bearer ${token}`)
  .send({ nome: 'João', email: 'joao@example.com' });


