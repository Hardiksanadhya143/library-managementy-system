// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/books');
const studentRoutes = require('./routes/students');
const issuedBookRoutes = require('./routes/issuedBooks');
const authRoutes = require('./routes/auth');
const aRoutes = require('./routes/a');






const app = express();
app.use('/api/a',aRoutes)
app.use('/api', authRoutes);
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/issuedbooks', issuedBookRoutes);



 
app.use('/api/users', userRoutes);

mongoose.connect('mongodb://localhost:27017/libraryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

app.use('/api/students', require('./routes/students'));

app.use('/api/books', require('./routes/books'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
