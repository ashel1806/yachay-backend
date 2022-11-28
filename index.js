const express = require('express');
require('dotenv').config();

const { connectToDatabase } = require('./src/configs/database.config');

const { authRoute, userRoute, courseRoute } = require('./src/routes');

const { errorHandler } = require('./src/middlewares');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/course', courseRoute);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
