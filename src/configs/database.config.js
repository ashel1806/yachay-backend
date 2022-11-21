const { Sequelize } = require('sequelize');

const projectDirectory = process.cwd();
const envFilePath = `${projectDirectory}/.env.${process.env.NODE_ENV}`;

require('dotenv').config({ path: envFilePath });

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const sequelize = new Sequelize(
  `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@database:3306/${MYSQL_DATABASE}`
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (err) {
    console.log('Error connecting to database:', err);
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
