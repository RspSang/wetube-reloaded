import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();
const logger = morgan("dev");



const Home = (req, res, next) => {
  return res.send("I love middleware");
  //return res.send("<h1>i still love you</h1>");
  // next();
};

const Login = (req, res) => {
  return res.send("Login here.")
};


app.use(logger);

app.get("/", Home);
app.get("/login", Login);

const handleListening = (req, res, next) =>
  console.log(`Server listenting on port http://localhost:${PORT} 🚀`);


app.listen(PORT, handleListening);
