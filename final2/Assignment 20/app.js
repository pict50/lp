const express = require("express")
const mongoose = require("mongoose")
const Employee = require("./models/employee")
const PORT = 3000;
const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/employee')
    .then(() => console.log("Connected to DB"));


app.get('/', async (req, res) => {
    const count = await Employee.countDocuments();
    const employee = await Employee.find()
    res.render('index', { employee, count })
})

app.get('/insert', async (req, res) => {
    const employees = [
        {
            "name": "Alice Johnson",
            "department": "Engineering",
            "designation": "Software Engineer",
            "salary": 75000,
            "joiningDate": "2022-05-15"
        },
        {
            "name": "Bob Smith",
            "department": "Marketing",
            "designation": "Marketing Manager",
            "salary": 68000,
            "joiningDate": "2021-03-22"
        },
        {
            "name": "Charlie Lee",
            "department": "Human Resources",
            "designation": "HR Executive",
            "salary": 52000,
            "joiningDate": "2023-01-10"
        },
        {
            "name": "Diana Patel",
            "department": "Finance",
            "designation": "Accountant",
            "salary": 60000,
            "joiningDate": "2020-07-30"
        },
        {
            "name": "Ethan Brown",
            "department": "Engineering",
            "designation": "DevOps Engineer",
            "salary": 80000,
            "joiningDate": "2022-11-05"
        }
    ]
    await Employee.insertMany(employees);
    res.send('5 Employees Inserted')
})

// Add new employee
app.post('/add', async (req, res) => {
    const { name, department, designation, salary, joiningDate } = req.body;
    await Employee.create({ name, department, designation, salary, joiningDate });
    res.redirect('/');
});

// Update employee by name
app.post('/update', async (req, res) => {
    const { name, department, designation, salary, joiningDate } = req.body;
    await Employee.findOneAndUpdate({ name }, { department, designation, salary, joiningDate });
    res.redirect('/');
});

// Delete employee by ID
app.post('/delete/:name', async (req, res) => {
    await Employee.findOneAndDelete({name:req.params.name});
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))