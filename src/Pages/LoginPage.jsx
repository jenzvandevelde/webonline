import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.username === 'jenzvandevelde' && values.password === 'Mylo1621') {
        navigate('/');
      } else {
        formik.setFieldError('password', 'Login gegevens niet correct. Probeer opnieuw.');
      }
    },
  });

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            required
            {...formik.getFieldProps('username')}
          />
          <label>Username</label>
        </div>
        {formik.touched.username && formik.errors.username && (
          <p className="error" style={{ color: 'white' }}>{formik.errors.username}</p>
        )}
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
            {...formik.getFieldProps('password')}
          />
          <label>Password</label>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="error" style={{ color: 'white' }}>{formik.errors.password}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
