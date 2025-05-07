const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/book')

const PORT = 3000;
const app = express()

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/book')
.then(()=>console.log('Connected to DB'))

app.get('/', async(req,res)=>{
  const count = await Book.countDocuments()
  const books = await Book.find()
  res.render('index',{count , books})
})

app.get('/insert',async(req,res)=>{
  const books = [
    {
      "name": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "price": 10.99,
      "genre": "Classic"
    },
    {
      "name": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "price": 7.99,
      "genre": "Fiction"
    },
    {
      "name": "1984",
      "author": "George Orwell",
      "price": 8.99,
      "genre": "Dystopian"
    },
    {
      "name": "Moby Dick",
      "author": "Herman Melville",
      "price": 12.49,
      "genre": "Adventure"
    },
    {
      "name": "Pride and Prejudice",
      "author": "Jane Austen",
      "price": 6.99,
      "genre": "Romance"
    }
  ]
  await Book.insertMany(books)
  res.send('5 books inserted')
})

app.post('/add',async(req,res)=>{
  const {name,author,price,genre} = req.body
  await Book.create({name,author,price,genre});
  res.redirect('/')
})

app.post('/update',async(req,res)=>{
  const {name,author,price,genre} = req.body;
  await Book.updateOne({name},{author,price,genre});
  res.redirect('/');
})

app.post('/delete/:name',async(req,res)=>{
  await Book.findOneAndDelete({name:req.params.name})
  res.redirect('/')
})

app.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`);
})