const express = require('express');
const cors = require('cors');
const { foodsRoutes } = require('./routes/food.routes');
const { userRoutes } = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/foods', foodsRoutes);

app.listen(process.env.port || 3333, () => console.log('Server is running '));
