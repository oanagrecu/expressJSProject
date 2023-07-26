const express = require("express");
// express app
const app = express();

//listen for requests
const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}/`)
);

// This is a request listener, just like in "vanilla Node"
app.get("/", (req, res) => {
  res.sendFile("./client/index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./client/about/index.html", { root: __dirname });
});
app.get("/blog", (req, res) => {
  res.sendFile("./client/blog/index.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  res.sendFile("./client/contact/index.html", { root: __dirname });
});
//404 page needs to be at the bottom of the responses 
app.use((req, res) => {
  res.status(404).sendFile("./client/404.html", { root: __dirname });
});

// app.post("/signup", (req, res) => {
//   console.log("a new project");
// });
