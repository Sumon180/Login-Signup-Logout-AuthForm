import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

//middleweare
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Msg: "We need token please provide it" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decode) => {
      if (err) {
        return res.json({ Msg: "Athentication Error" });
      } else {
        req.name = decode.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) return res.json({ Msg: "Server side error" });
    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Msg: "No records exist" });
    }
  });
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Insert the user into the database
    const query =
      "INSERT INTO login (firstname, lastname, email, password) VALUES (?, ?, ?, ?)";
    await new Promise((resolve, reject) => {
      db.query(query, [firstName, lastName, email, password], (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });

    // User successfully inserted
    res.json({ message: "User inserted successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Error inserting user" });
  }
});

app.use("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
  app.listen(8081, () => {
    console.log("Server is running http://localhost:8081");
  });
});
