const path = require("path");
const fs = require("fs");
var os = require("os");
console.log("new task");

// fs.mkdir(path.join(__dirname, "/client", "about"), {}, (err) => {
//   if (err) throw err;
//   console.log("Folder created...");
// });

fs.writeFile(
  path.join(__dirname, "/client", "/about", "index.html"),
  ` <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>About</title>
      </head>
      <body>
          <h1> Client1 - About</h1>
      </body>
      </html>`,

  (err) => {
    if (err) throw err;
    console.log("File written to...");

    // File append
    fs.appendFile(
      path.join(__dirname, "/client", "/about", "index.html"),
      "",
      (err) => {
        if (err) throw err;
        console.log("File written to...");
      }
    );
  }
);
fs.readFile(
  path.join(__dirname, "/client", "/about", "index.html"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

fs.writeFile(
  path.join(__dirname, "/client", "/about", "style.css"),
  "body {background-color:orange;}",
  (err) => {
    if (err) throw err;
    console.log("File written to...");

    // File append
    fs.appendFile(
      path.join(__dirname, "/client", "/about", "style.css"),
      "",
      (err) => {
        if (err) throw err;
        console.log("File written to...");
      }
    );
  }
);
// fs.writeFile(
//   path.join(__dirname, "/client/blog", "style.css"),
//   "body {background-color:red;}",
//   (err) => {
//     if (err) throw err;
//     console.log("File written to...");

//     // File append
//     fs.appendFile(
//       path.join(__dirname, "/client/blog", "style.css"),
//       "",
//       (err) => {
//         if (err) throw err;
//         console.log("File written to...");
//       }
//     );
//   }
// );
// fs.readFile(
//   path.join(__dirname, "/client/about", "style.css"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );
// fs.readFile(
//   path.join(__dirname, "/client/about", "style.css"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

fs.writeFile(
  path.join(__dirname, "/client", "/blog", "style.css"),
  "body {background-color:yellow;}",
  (err) => {
    if (err) throw err;
    console.log("File written to...");

    // File append
    fs.appendFile(
      path.join(__dirname, "/client", "/blog", "style.css"),
      "",
      (err) => {
        if (err) throw err;
        console.log("File written to...");
      }
    );
  }
);
fs.writeFile(
  path.join(__dirname, "/client", "info.txt"),
  "This is being run on a " + os.type() + " computer!",

  (err) => {
    if (err) throw err;
    console.log("File written to...");

    // File append
    fs.appendFile(path.join(__dirname, "/client", "info.txt"), "", (err) => {
      if (err) throw err;
      console.log("File written to...");
    });
  }
);
