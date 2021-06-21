import express from "express";

const PORT = 4000;
const app = express();
const gossipMiddleware = (req, res, next) => {
  console.log(`Someon is going to: ${req.url}`);
  next();
}

const handleHome = (req, res, next) => {
  console.log(`Someon is going to: ${req.url}`);

  return res.send("I love middleware");
  //return res.send("<h1>i still love you</h1>");
  // next();
};

const handleLogin = (req, res) => {
  return res.send("Login here.")
}

app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);

const handleListening = (req, res, next) =>
  console.log(`Server listenting on port http://localhost:${PORT} 🚀`);


app.listen(PORT, handleListening);
