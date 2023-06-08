import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["POST,GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ Msg: "Server side error" });
    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Msg: "No records existed" });
    }
  });
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
  app.listen(8081, () => {
    console.log("Server is running http://localhost:8081");
  });
});
