import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './StudentRegistrationPage.css';

const StudentRegistrationPage = ({ refreshStudents }) => {
  const generateRandomId = () => {
    return 'MLSU-' + Math.floor(Math.random() * 1000000);
  };
  const [formData, setFormData] = useState({
    studentId:generateRandomId(),
    studentName: '',
    fatherName: '',
    motherName: '',
    photo: null,
    address: '',
    email: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId) errors.studentId = 'Student ID is required';
    if (!formData.studentName) errors.studentName = 'Student name is required';
    if (!formData.fatherName) errors.fatherName = 'Father name is required';
    if (!formData.motherName) errors.motherName = 'Mother name is required';
    if (!formData.photo) errors.photo = 'Photo is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const formDataWithFile = new FormData();
      formDataWithFile.append('studentId', formData.studentId);
      formDataWithFile.append('studentName', formData.studentName);
      formDataWithFile.append('fatherName', formData.fatherName);
      formDataWithFile.append('motherName', formData.motherName);
      formDataWithFile.append('photo', formData.photo);
      formDataWithFile.append('address', formData.address);
      formDataWithFile.append('email', formData.email);

      try {
        const response = await axios.post('http://localhost:5000/api/students', formDataWithFile, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Student registered:', response.data);

        // Clear form data and show success message
        setFormData({
          studentId: '',
          studentName: '',
          fatherName: '',
          motherName: '',
          photo: null,
          address: '',
          email: ''
        });
        setFormErrors({});
        setServerError('');
        setSuccessMessage('Student registered successfully!');

        // Refresh students on parent component
        if (refreshStudents) refreshStudents();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setServerError(error.response.data.message);
        } else {
          console.error('There was an error registering the student!', error);
        }
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Layout>
      <div className="registration-container">
        <h1>Student Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              readOnly
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
            />
            {formErrors.studentId && <span className="error">{formErrors.studentId}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
            />
            {formErrors.studentName && <span className="error">{formErrors.studentName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="fatherName">Father Name</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
            {formErrors.fatherName && <span className="error">{formErrors.fatherName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="motherName">Mother Name</label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
            {formErrors.motherName && <span className="error">{formErrors.motherName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />
            {formErrors.photo && <span className="error">{formErrors.photo}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {formErrors.address && <span className="error">{formErrors.address}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>
          <button type="submit">Register</button>
        </form>
        {serverError && <div className="popup error">{serverError}</div>}
        {successMessage && <div className="popup success">{successMessage}</div>}
      </div>
    </Layout>
  );
};

export default StudentRegistrationPage;
