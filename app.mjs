import fs from "fs";
import express from "express";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const users = [
  {
    id: 1,
    username: "user123",
    password: "password123",
  },
];

const verifyJWT = (req, res, next) => {
  const token = req.query.key || req.header("Authorization");
  if (!token) {
    return res.redirect("/dishes");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.render("invalidKey");
    }
    req.user = user;
    next();
  });
};

app.post("/login", (req, res) => {
  const { key } = req.body;

  const token = jwt.sign({ key }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.redirect(`/dishes?key=${token}`);
});

app.get("/", (req, res) => {
  if (req.user) {
    return res.redirect("/dishes");
  }
  res.render("enterKey");
});

app.get("/dishes", verifyJWT, (req, res) => {
  fs.readFile("dishes.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    try {
      const dishes = JSON.parse(data);
      return res.render("dishes", { dishes });
    } catch (parseError) {
      return res.status(500).json({ message: "Error parsing dishes data" });
    }
  });
});

app.get("/dishes/:name", (req, res) => {
  const partialDishName = req.params.name.toLowerCase();

  fs.readFile("dishes.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    try {
      const dishes = JSON.parse(data);

      const specificDish = dishes.find((dish) =>
        dish.name.toLowerCase().includes(partialDishName)
      );

      if (!specificDish) {
        return res.status(404).render("404");
      }

      return res.render("specificDish", { dish: specificDish });
    } catch (parseError) {
      return res.status(500).json({ message: "Error parsing dishes data" });
    }
  });
});

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

app.listen(PORT, () =>
  console.log(`Server started: http://localhost:${PORT}/`)
);

// app.get("/dishes", (req, res) => {
//   const dishes = [
//     {
//       name: "Pasta Carbonara",
//       timeToPrepare: "30 minutes",
//       ingredients: ["pasta", "eggs", "bacon", "cheese", "garlic", "pepper"],
//       steps: [
//         "Boil the pasta until al dente.",
//         "In a bowl, mix eggs, cheese, and pepper.",
//         "Fry the bacon and garlic in a pan.",
//         "Drain the pasta and add it to the pan with bacon.",
//         "Pour the egg mixture over the pasta and toss quickly.",
//         "Serve immediately.",
//       ],
//     }];
//   res.send({
//     message: "this is the data",
//     dishes: dishes,
//   });
// });

// app.get("/dishes", (req, res) => {
//   res.sendFile("./view/index.ejs", { root: __dirname });
// });
// app.get("/dishes/name", (req, res) => {
//   res.sendFile("./view/dish.ejs", { root: __dirname });
// });
// app.get("/dishes", (req, res) => {
//   res.sendFile("./views/recipes.ejs", { root: __dirname });
// });

// //404 page needs to be at the bottom of the responses
// app.use((req, res) => {
//   res.status(404).sendFile("./404.html", {
//     console.log("new request error")
//    });
// });
