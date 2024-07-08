import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import './ViewStudentsPage.css';

const ViewStudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Function to sort students by studentId
  const sortStudents = (students) => {
    return students.sort((a, b) => {
      const idA = parseInt(a.studentId, 10);
      const idB = parseInt(b.studentId, 10);
      return idA - idB;
    });
  };

  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      const sortedStudents = sortStudents(response.data);
      setStudents(sortedStudents);
      setFilteredStudents(sortedStudents); // Initialize filtered students with all students
    } catch (error) {
      handleError(error);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterStudents(e.target.value);
  };

  // Function to filter students based on student ID
  const filterStudents = (term) => {
    if (!term) {
      setFilteredStudents(students); // Reset to show all students when search term is empty
    } else {
      const filtered = students.filter((student) =>
        student.studentId.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${selectedStudentId}`);
      const updatedStudents = students.filter((student) => student._id !== selectedStudentId);
      const sortedUpdatedStudents = sortStudents(updatedStudents);
      setStudents(sortedUpdatedStudents);
      setFilteredStudents(sortedUpdatedStudents.filter((student) =>
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setIsModalOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedStudentId(null);
  };

  const handleError = (error) => {
    if (error.response) {
      setError(`Server responded with status code ${error.response.status}: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      setError('No response received from server. Please try again later.');
    } else {
      setError('Error in setting up the request. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="view-students-container">
        <h1>Registered Students</h1>
        {error && <p className="error">{error}</p>}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Student ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Photo</th>
              <th>Address</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.fatherName}</td>
                <td>{student.motherName}</td>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${student.photo}`}
                    alt="student"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this student?"
      />
    </Layout>
  );
};

export default ViewStudentsPage;
