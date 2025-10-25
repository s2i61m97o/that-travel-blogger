import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const blogposts = getBlogPosts();

app.get("/", (req, res) => {
  // TO TEST FETCHING FIRST BLOGPOST
const firstBlogpost = blogposts[Object.keys(blogposts)[0]];

  res.render("main/index", { stylesheet: "css/index.css", blogposts: blogposts });
});

app.get("/articles", (req, res) => {
  res.render("main/articles", { stylesheet: "css/articles.css", blogpostData: blogposts });
});

app.get("/blogpost/:slug", (req, res) => {
  const slug = req.params.slug;
  const blogpost = blogposts[slug];
  
  // Handle case where blogpost does not exist 
  if (!blogpost) {
    return res.status(404).render('404', { slug });
  }
  res.render('main/blogpost', { blogpost: blogpost, slug: slug, stylesheet: "css/blogpost.css" });
});

app.get("/destination-guides", (req, res) => {
  res.render("main/destination-guides", { stylesheet: "css/destination-guides.css" });
});

app.get("/planning-tips", (req, res) => {
  res.render("main/planning-tips", { stylesheet: "css/planning-tips.css" });
});

app.get("/404", (req, res) => {
  res.status(404).render("main/404", { stylesheet: "css/404.css" });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Function to read blog post data from JSON file
function getBlogPosts() {
  try {
    const data = fs.readFileSync('./database/blogpostData.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading blog posts:', err);
    return {};
  }
}