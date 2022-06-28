const express = require("express");
const app = express();
const path = require("path");
const validator = require("validator");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const PORT = 3000;
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "assignment",
});

// connect
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected!");
});

app.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;

  if (!username) {
    return res.status(400).json({
      error: "Username is required.",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: "Email is required.",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Please enter a valid email.",
    });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({
      error: "Password must be at least 6 characters.",
    });
  }

  async function checkExistEmail() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM user WHERE email = '${email}'`;
      db.query(sql, async (err, result) => {
        if (err) throw err;
        resolve(result.length);
      });
    });
  }

  const existEmail = await checkExistEmail();

  if (existEmail) {
    return res.status(400).json({
      error: "This email has been signed up before.",
    });
  } else {
    const encryptedPassword = await bcrypt.hash(password, 10);

    let user = {
      username: username,
      email: email,
      password: encryptedPassword,
    };

    let sql = "INSERT INTO user SET ?";
    db.query(sql, user, (err, result) => {
      if (err) throw err;
      return res.status(200).json({
        ok: true,
        username,
      });
    });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Email is required.",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Please enter a valid email.",
    });
  }

  let sql = `SELECT * FROM user WHERE email = '${email}'`;
  db.query(sql, async (err, result) => {
    if (err) throw err;
    if (!result.length) {
      return res.status(400).json({
        error: "This email has not been signed up yet.",
      });
    }
    let user = result[0];

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({
        error: "Your password is incorrect.",
      });
    }

    return res.status(200).json({
      ok: true,
      username: user.username,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}`);
});
