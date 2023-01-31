const Router = require('express');
const { prisma } = require('../config/prismaClient');
const { hash } = require('bcrypt');
const userRoutes = Router();

userRoutes.post('/createUser', async (request, response) => {
  const { name, email, password } = request.body;

  const userExists = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  if (userExists) {
    return response.status(401).json({ message: 'Email já existente' });
  }

  const hashPassword = await hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      password: hashPassword,
      name,
    },
  });

  return response.status(200).json(user);
});

module.exports = {
  userRoutes,
};
