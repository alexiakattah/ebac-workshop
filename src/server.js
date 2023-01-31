const express = require('express');
const cors = require('cors');
const { foodsRoutes } = require('./routes/food.routes');
const { userRoutes } = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.use((err, request, response, next) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    status: '500',
    message: 'Internal server error',
  });
});

app.listen(process.env.port || 3333, () => console.log('Server is running '));
