const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 4000;

app.use(cors());
app.use(express.json());

function sayHi(req, res) {
  res.send("Hello World");
}

app.get("/", sayHi);

app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);

app.listen(PORT, function () {
  console.log(`Server is runnig on: ${PORT}`);
});
const users = [];

function signUp(req, res) {
  const body = req.body;
  const email = req.body.email;
  const password = req.body.password;

  const userInDb = users.find((user) => user.email === body.email);
  if (userInDb != null) {
    res.status(400).send("Email already exists");
    return;
  }
  const user = {
    email: email,
    password: password,
  };
  users.push(user);
  res.send("Sign up");
}
function login(req, res) {
  const body = req.body;

  console.log("body:", body);
  console.log("user in db:", users);

  const userInDb = users.find((user) => user.email === body.email);
  if (userInDb == null) {
    res.status(401).send("Wrong email");
    return;
  }

  const passwordInDb = userInDb.password;
  if (passwordInDb != body.password) {
    res.status(401).send("Wrong password");
    return;
  }
  res.send({
    userId: "123",
    token: "token",
  });
}
