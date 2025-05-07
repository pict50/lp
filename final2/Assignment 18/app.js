const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/song');
const app = express();
const PORT = 3000; 

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/music')
.then(()=> console.log("Connected to Db"));

//Insert 5 songs initially
app.get('/insert', async(req,res)=> { 
const songs = [
    {Songname: "Song A", Film: "Film A", Music_director: "Director 1", Singer: "Singer 1"},
    {Songname: "Song B", Film: "Film B", Music_director: "Director 2", Singer: "Singer 2"},
    {Songname: "Song C", Film: "Film C", Music_director: "Director 3", Singer: "Singer 3"},
    {Songname: "Song D", Film: "Film D", Music_director: "Director 4", Singer: "Singer 4"},
    {Songname: "Song E", Film: "Film E", Music_director: "Director 5", Singer: "Singer 5"},
];
await Song.insertMany(songs);
res.send("Inserted 5 songs");
});

//Display all the songs
app.get('/', async(req,res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.render('index',{songs, count});
});

//filter by music director 
app.get('/director', async(req,res) =>{
    const songs = await Song.find({Music_director: req.query.name});
    res.render('index', {songs, count: songs.length});
});

//filer by music director + singer 
app.get('/search-director-singer' , async(req,res)=>{
    const {director, singer} = req.query;
    const songs = await Song.find({Music_director:director, Singer:singer});
    res.render('index',{songs, count:songs.length}); 
});

// Filter by Film + Singer (form)
app.get('/search-film-singer', async (req, res) => {
  const { film, singer } = req.query;
  const songs = await Song.find({ Film: film, Singer: singer });
  res.render('index', { songs, count: songs.length });
});

//delete a song
app.post('/delete/:song', async(req,res)=>{
    await Song.deleteOne({Songname:req.params.song});
    res.redirect('/');
});

// Add new song
app.post('/add', async (req, res) => {
  const { Songname, Film, Music_director, Singer } = req.body;
  await Song.create({ Songname, Film, Music_director, Singer });
  res.redirect('/');
});

// Update Actor/Actress
app.post('/update', async (req, res) => {
  const { Songname, Actor, Actress } = req.body;
  await Song.updateOne({ Songname }, { $set: { Actor, Actress } });
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server listenting at http://localhost:${PORT}`));

