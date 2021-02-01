const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');

const User = require('../persistence/users');

module.exports = {authenticate};

async function authenticate(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
  const user = await User.find(email);
  if (!user || !(await bcrypt.compare(hashedPassword, user.password))) {
    throw new Error('Username and password is incorrect');
  }

  const token = jwt.sign({sub: user.id}, config.SECRET, {expiresIn: '1d'});

  return {
    ...omitPassword(user),
    token
  };
}

function omitPassword(user) {
  const {password, ...userWithoutPassword} = user;
  return userWithoutPassword;
}
