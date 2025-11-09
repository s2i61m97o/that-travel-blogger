import express from "express";
import fs from "fs";

// const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const blogposts = getBlogPosts();
const guides = getGuides();

app.get("/", (req, res) => {
  // GET ONLY FIRST 7 BLOGPOSTS
  const first7Posts = Object.fromEntries(Object.entries(blogposts).slice(0, 7));
  res.render("main/index", {
    stylesheet: "css/index.css",
    first7Posts,
    guides
  });
});

app.get("/blogposts", (req, res) => {
  res.render("main/blogpost-home", {
    stylesheet: "css/blogpost-home.css",
    blogposts,
  });
});

app.get("/blogpost/:slug", (req, res) => {
  const slug = req.params.slug;
  const blogpost = blogposts[slug];
  const blogContent = fs.readFileSync(blogpost.content, "utf8");
  const blogImagesDir = `/images/blogposts/${blogpost.country.toLowerCase()}/`;

  // Handle case where blogpost does not exist
  if (!blogpost) {
    return res.status(404).render("404", { slug, stylesheet: "css/404.css" });
  }
  res.render("main/blogpost", {
    blogpost,
    blogContent,
    blogImagesDir,
    slug,
    stylesheet: "css/blogpost.css",
  });
});

app.get("/destination-guides", (req, res) => {
  res.render("main/destination-guide-home", {
    guides,
    stylesheet: "css/destination-guide-home.css",
  });
});

app.get("/destination-guide/:slug", (req, res) => {
  const slug = req.params.slug;
  const guide = guides[slug];
  const guideTitle = guide.title
  const guideCities = guide.cities;
  const guideNature = guide.nature;
  const guideExperiences = guide.experience;
  const guideFood = guide.food_and_drink;
  const guideAccom = guide.accomodation;

  //Handle case where guide does not exist
  if (!guide) {
    return res.status(404).render("/404", { slug });
  }
  res.render("main/destination-guide", {
    stylesheet: "css/destination-guide.css",
    slug,
    guideTitle,
    guideCities,
    guideNature,
    guideExperiences,
    guideFood,
    guideAccom,
  });
});

app.get("/planning-tips", (req, res) => {
  res.render("main/planning-tips", { stylesheet: "css/planning-tips.css" });
});

app.use((req, res, next) => {
  res.status(404).render("main/404", {stylesheet: "css/404.css"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Function to read blog post data from JSON file
function getBlogPosts() {
  try {
    const data = fs.readFileSync("./database/blogpost-db.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading blog posts:", err);
    return {};
  }
}

// Function to read destination guides from JSON file

function getGuides() {
  try {
    const data = fs.readFileSync("./database/guide-db.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.err("Error reading guides dara:", err);
    return {};
  }
}
