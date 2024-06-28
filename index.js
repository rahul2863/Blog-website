import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 4000;

// Load environment variables from .env file
dotenv.config();
// console.log(process.env.DB_NAME);
const db = new pg.Client({
  user:  process.env.DB_USER,
  host:  process.env.DB_HOST,
  database: process.env.DB_NAME,
  password:  process.env.DB_PASSWORD,
  port:  process.env.PORT || 5432,
});

db.connect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let posts=[];
//GET All posts
app.get('/posts',(req,res)=>{
  db.query("Select * from blog_posts", (err, respond) => {
    if (err) {
      console.log("Error executing query", err.stack);
    } else {
      posts = respond.rows;
      //console.log(posts);
      res.json(posts);
    }
  });
});


// GET a specific post by id
app.get('/posts/:id',(req,res)=>{

  const newid = parseInt(req.params.id); 

db.query("Select * from blog_posts where id = $1",[newid],(err, respond) => {
    if (err) {
      console.log("Error executing query", err.stack);
    } else {
      posts = respond.rows;
      console.log(posts[0]);
      res.json(posts[0]);
    }
  });

});


// POST a new post
app.post('/posts',(req,res)=>{

  const newPost={
    id: posts.length+1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };

  db.query("Insert into blog_posts values($1,$2,$3,$4,$5)",
    [newPost.id,newPost.title,newPost.content,newPost.author,newPost.date],
    (err, respond) => {
    if (err) {
      console.log("Error executing query", err.stack);
    } else {
     posts = respond.rows;
     console.log(posts);
     res.json(posts);
    }
  });

});


//PATCH a post when you just want to update one parameter
app.patch('/posts/:id',(req,res)=>{

  const newid = parseInt(req.params.id);
  let updateIndex = posts.findIndex((posts)=> posts.id === newid);
  
  db.query("Update blog_posts set title = $1, content = $2, author = $3, date = $4 where id = $5",
    [req.body.title || posts[updateIndex].title,
    req.body.content || posts[updateIndex].content,
    req.body.author || posts[updateIndex].author,
    req.body.date || new Date(),
    newid],
    (err, respond) => {
      if (err) {
        console.log("Error executing Update", err.stack);
        res.sendStatus(404);
      } else {
       res.sendStatus(200)
      }
    }
  )

});


//DELETE a specific post by providing the post id.
app.delete('/posts/:id',(req,res)=>{
  const newid = parseInt(req.params.id);

  db.query("Delete from blog_posts where id = $1",[newid],(err, respond) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  })
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
