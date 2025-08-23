const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const weatherRoutes = require('./Routes/weatherRoutes.js');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

// health route (public)
app.get('/health', (req, res) => res.json({ ok: true }));

// protect weather route
app.use('/api/weather', checkJwt, weatherRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'invalid_token', details: err.message });
  }
  next(err);
});

app.listen(port, () => {
  console.log('server is running on port ' + port);
});
