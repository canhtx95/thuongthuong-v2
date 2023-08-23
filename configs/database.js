import { DataSource } from "typeorm"
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
}

const myDataSource = new DataSource(config)