const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mealplanner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        password: hashedPassword
    });
    await user.save();
    res.status(201).send();
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Invalid password');
    const token = jwt.sign({ _id: user._id }, 'secret');
    res.header('Authorization', token).send();
});

app.listen(3000, () => console.log('Server is running on port 3000'));

// Existing code...

const MealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mealName: String,
    calories: Number
});
const Meal = mongoose.model('Meal', MealSchema);

app.post('/add-meal', async (req, res) => {
    const { userId, mealName, calories } = req.body;
    const meal = new Meal({
        userId,
        mealName,
        calories
    });
    await meal.save();
    res.status(201).send();
});

app.get('/meals/:userId', async (req, res) => {
    const meals = await Meal.find({ userId: req.params.userId });
    res.send(meals);
});

// Existing code...
