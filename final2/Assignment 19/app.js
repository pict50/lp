    const express = require('express');
    const mongoose = require('mongoose');
    const Student = require('./models/student');
    const app = express();
    PORT = 3000;

    app.set('view engine', 'ejs');
    app.use(express.urlencoded({extended:true}));

    mongoose.connect('mongodb://localhost:27017/student')
    .then(()=>console.log("Connected to DB"));

    // Add 5 students initally
    app.get('/insert', async(req,res)=>{
        const student=[
            {Name:'Student A', Roll_No:1, WAD:23, DSBDA:28, CNS:20, CC:20, AI:18},
            {Name:'Student B', Roll_No:2, WAD:24, DSBDA:27, CNS:19, CC:23, AI:20},
            {Name:'Student C', Roll_No:3, WAD:25, DSBDA:26, CNS:30, CC:25, AI:27},
            {Name:'Student D', Roll_No:4, WAD:26, DSBDA:25, CNS:27, CC:27, AI:29},
            {Name:'Student E', Roll_No:5, WAD:27, DSBDA:24, CNS:16, CC:29, AI:26},
        ]
        await Student.insertMany(student);
        res.send("5 Students inserted");
    });

    //Display all the Students
    app.get('/', async(req,res)=>{
        const count =  await Student.countDocuments();
        const student = await Student.find();
        res.render('index', {student, count});
    });

    //Students with dsbda marks>20
    app.get('/dsbda',async(req,res)=>{
        const student = await Student.find({DSBDA: {$gt:20}});
        res.render('index',{student, count: student.length});
    })

    //update the student marks by 10
    app.post('/update', async(req,res)=>{
        const {Name} = req.body;
        await Student.updateOne(
            { Name: Name },
            { $inc: {
                WAD: 10,
                CC: 10,
                DSBDA: 10,
                CNS: 10,
                AI: 10
            }
            }
        );
        res.redirect('/');
    });

    //All students greater than 25
    app.get('/allgreater', async(req,res)=>{
        const student = await Student.find({
            WAD: {$gt:25},
            DSBDA:{$gt: 25},
            CNS:{$gt:25},
            CC:{$gt:25},
            AI:{$gt:25}
        });
        res.render('index',{student, count: student.length });
    });

    //All students who scored less than 23 in wad and dsbda
    app.get('/allless', async(req,res)=>{
        const student = await Student.find({
            WAD:{$lt:23},
            DSBDA:{$lt:23}
        });
        res.render('index',{student, count: student.length});
    });

    //Delete one student
    app.post('/delete/:name', async(req,res)=>{
        await Student.deleteOne({Name:req.params.name});
        res.redirect('/');
    });

    //Add new student 
    app.post('/add', async(req,res) =>{
        const {Name, Roll_No, WAD, DSBDA, CNS, CC, AI}=req.body;
        await Student.create({Name, Roll_No, WAD, DSBDA, CNS, CC, AI});
        res.redirect('/');
    });

    app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
