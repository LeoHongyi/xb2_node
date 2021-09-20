import mysql from 'mysql2';

import {
  APP_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_HOST
} from '../app.config';

export const connection = mysql.createConnection({
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT, 10),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
})

