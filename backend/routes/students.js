const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST new student
router.post('/', upload.single('photo'), async (req, res) => {
  const { studentId, studentName, fatherName, motherName, address, email } = req.body;

  try {
    // Check for duplicate studentId
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID must be unique' });
    }

    const newStudent = new Student({
      studentId,
      studentName,
      fatherName,
      motherName,
      photo: req.file.filename, // Save the filename of the uploaded photo
      address,
      email
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent); // Return saved student data
  } catch (error) {
    console.error('Error saving student:', error.message);
    res.status(500).json({ message: error.message });
  }
});


// ... multer configuration ...

// PUT update student by id
router.put('/:id', upload.single('photo'), async (req, res) => {
  const { studentId, studentName, fatherName, motherName, address, email } = req.body;

  try {
    // Check for existing student with the same studentId
    const existingStudent = await Student.findOne({ studentId, _id: { $ne: req.params.id } });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID must be unique' });
    }

    // Update the student record
    const updatedStudent = {
      studentId,
      studentName,
      fatherName,
      motherName,
      address,
      email
    };

    // Update photo only if a new file is uploaded
    if (req.file) {
      updatedStudent.photo = req.file.filename;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, updatedStudent, { new: true });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error updating student:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// DELETE student by id
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
