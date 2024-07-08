import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const StudentDetailsSidePanel = ({ studentDetails, onClose, onIssue }) => {
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleIssue = async () => {
    const issue = new Date(issueDate);
    const returnD = new Date(returnDate);

    // Validation: Issue date should be before return date
    if (issue >= returnD) {
      setSuccessMessage('Issue date must be before return date.');
      return;
    }

    // Validation: Gap between issue date and return date should not be more than one month
    const oneMonthLater = new Date(issue);
    oneMonthLater.setMonth(issue.getMonth() + 1);

    if (returnD > oneMonthLater) {
      setSuccessMessage('The gap between issue date and return date cannot be more than one month.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/issuedbooks/issue', {
        bookId: studentDetails.book._id,
        studentId: studentDetails._id,
        issueDate,
        returnDate,
      });
      onIssue();
      setIssueDate('');
      setReturnDate('');
      setSuccessMessage('Book issued successfully!');
    } catch (error) {
      console.error('Error issuing the book:', error);
      setSuccessMessage('Error issuing the book. Please try again.');
    }
  };

  return (
    <div className={`student-details-side-panel ${studentDetails ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      {studentDetails ? (
        <div>
          <h2>Student Details</h2>
          <img src={`http://localhost:5000/uploads/${studentDetails.photo}`} alt={studentDetails.studentName} />
          <p><strong>ID:</strong> {studentDetails.studentId}</p>
          <p><strong>Name:</strong> {studentDetails.studentName}</p>
          <p><strong>Father's Name:</strong> {studentDetails.fatherName}</p>
          <p><strong>Mother's Name:</strong> {studentDetails.motherName}</p>
          <p><strong>Address:</strong> {studentDetails.address}</p>
          <p><strong>Email:</strong> {studentDetails.email}</p>
          <div>
            <label>Issue Date:</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
          </div>
          <div>
            <label>Return Date:</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
          <button className="issue-button" onClick={handleIssue}>Issue Book</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      ) : (
        <div>
          <h2>Issue Book</h2>
          <p className="error">Please enter student ID:</p>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsSidePanel;
