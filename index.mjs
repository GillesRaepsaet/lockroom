import pg from "pg";
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

const { Pool } = pg;

dotenv.config();
const PORT = 3000;

const pool = new Pool({
  host: "localhost",
  user: "projectadmin",
  database: "project",
  password: "t123",
  port: 5432,
});

const app = express();
app.use(express.json());

await pool.connect();

app.get("/", (req, res) => res.send({ info: `test` }));

app.get("/api/register", async (req, res) => {
  const users = await pool.Query(`SELECT * FROM users`);

  res.send(users.rows);
});

app.get("/api/register/users/:id", async (req, res) => {});

app.post("/api/lobby/:id", async (req, res) => {
  pool.query(
    `INSERT INTO users (nickname, email,password) VALUE ($1,$2,$3)`,
    `{
    req.body.nickname, req.body.email, req.body.password
  }`
  );
  return res.send({ info: "User stock" });
});

app.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}/`)
);


const users = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

