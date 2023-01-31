const Router = require('express');
const { prisma } = require('../config/prismaClient');
const foodsRoutes = Router();

foodsRoutes.post('/create', async (request, response) => {
  const { description, price, image, name } = request.body;

  const food = await prisma.foods.create({
    data: {
      description,
      price,
      image,
      name,
    },
  });
  return response.status(200).json(food);
});
foodsRoutes.get('/list/:id', async (request, response) => {
  const { id } = request.params;

  const food = await prisma.foods.findFirst({
    where: {
      userId: id,
    },
  });
  return response.status(200).json(food);
});
foodsRoutes.get('/listAll/:userId', async (request, response) => {
  const { userId } = request.params;

  const food = await prisma.foods.findFirst({
    where: {
      userId: userId,
    },
  });
  return response.status(200).json(food);
});

foodsRoutes.put('/change/:id', async (request, response) => {
  const { id } = request.params;
  const { description, price, image, name } = request.body;

  const food = await prisma.foods.findFirst({
    where: {
      id,
    },
  });

  if (!food) {
    return response.json({
      message: 'Prato nao encontrado',
    });
  }

  const createFood = await prisma.foods.update({
    where: {
      id,
    },
    data: {
      description,
      price,
      image,
      name,
    },
  });
  return response.status(200).json({ status: 'ok' });
});

foodsRoutes.delete('/delete/:id', async (request, response) => {
  const { id } = request.params;

  const food = await prisma.foods.delete({
    where: {
      id,
    },
  });
  return response.status(200).json(food);
});

module.exports = {
  foodsRoutes,
};
