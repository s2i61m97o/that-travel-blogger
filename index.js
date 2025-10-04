import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("main/index", { stylesheet: "css/index.css" });
});

app.get("/articles", (req, res) => {
  res.render("main/articles", { stylesheet: "css/articles.css" });
});

app.get("/destination-guides", (req, res) => {
  res.render("main/destination-guides", { stylesheet: "css/destination-guides.css" });
});

app.get("/planning-tips", (req, res) => {
  res.render("main/planning-tips", { stylesheet: "css/planning-tips.css" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


