import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AuthPage.css';


const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('http://localhost:5000/user/login', values);
        localStorage.setItem('profile', JSON.stringify(data));
        navigate('/home');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const signupFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      address: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phoneNumber: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      address: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('http://localhost:5000/user/signup', values);
        localStorage.setItem('profile', JSON.stringify(data));
        setIsLogin(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className={`auth-box ${isLogin ? 'login' : 'signup'}`}>
        <h1>{isLogin ? 'Login' : 'Signup'}</h1>
        <form onSubmit={isLogin ? loginFormik.handleSubmit : signupFormik.handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={signupFormik.values.username}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  className="form-control"
                />
                {signupFormik.touched.username && signupFormik.errors.username && (
                  <div className="error">{signupFormik.errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={signupFormik.values.phoneNumber}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  className="form-control"
                />
                {signupFormik.touched.phoneNumber && signupFormik.errors.phoneNumber && (
                  <div className="error">{signupFormik.errors.phoneNumber}</div>
                )}
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={signupFormik.values.address}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  className="form-control"
                />
                {signupFormik.touched.address && signupFormik.errors.address && (
                  <div className="error">{signupFormik.errors.address}</div>
                )}
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={isLogin ? loginFormik.values.email : signupFormik.values.email}
              onChange={isLogin ? loginFormik.handleChange : signupFormik.handleChange}
              onBlur={isLogin ? loginFormik.handleBlur : signupFormik.handleBlur}
              className="form-control"
            />
            {isLogin
              ? loginFormik.touched.email && loginFormik.errors.email && (
                  <div className="error">{loginFormik.errors.email}</div>
                )
              : signupFormik.touched.email && signupFormik.errors.email && (
                  <div className="error">{signupFormik.errors.email}</div>
                )}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={isLogin ? loginFormik.values.password : signupFormik.values.password}
              onChange={isLogin ? loginFormik.handleChange : signupFormik.handleChange}
              onBlur={isLogin ? loginFormik.handleBlur : signupFormik.handleBlur}
              className="form-control"
            />
            {isLogin
              ? loginFormik.touched.password && loginFormik.errors.password && (
                  <div className="error">{loginFormik.errors.password}</div>
                )
              : signupFormik.touched.password && signupFormik.errors.password && (
                  <div className="error">{signupFormik.errors.password}</div>
                )}
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupFormik.values.confirmPassword}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                className="form-control"
              />
              {signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword && (
                <div className="error">{signupFormik.errors.confirmPassword}</div>
              )}
            </div>
          )}
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
          {isLogin ? 'Go to Signup' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
