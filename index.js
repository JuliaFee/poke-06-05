const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 9876;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssbu',
  password: 'ds564',
  port: 9876,
});

app.use(express.json());
