import React from "react";
import moment from "moment";
import * as Yup from 'yup';
import { registerUser } from "../../../actions/user_actions";
import { useDispatch } from "react-redux";
import axios from 'axios'

import { Form, Input, Button, Typography } from 'antd';
import { Formik } from 'formik';

import '../../stylesheets/register.css'

const {Title} = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .required('Username is required')
          .min(3, 'Your username is too short'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(8, 'Your password is too short')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
            'Invalid, read instructions below')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Password Confirmation is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            username: values.username,
            profilePicture: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            // console.log(response);
            // console.log(dataToSubmit);
            if (response.payload.success) {
              const variables = {
                username: values.username
              }

              axios.post('/api/pomodoro/getDataByUsername', variables)
                .then(response => {
                  if (response.data.success) {
                    console.log(response.data.user)
                    const settings = {
                      user: response.data.user._id,
                      duration: 25,
                      shortBreak: 5,
                      longBreak: 15,
                      longBreakDelay: 4,
                      pomodoroCounter: 1,
                      autoStartPomodoro: true,
                      autoStartBreak: true
                    }

                    const tasks = {
                      user: response.data.user._id,
                      tasks: [],
                      categories: []
                    }

                    axios.post('/api/pomodoro/saveSettings', settings)
                      .then(response => {
                        if (response.data.success) {
                          // alert('Settings were saved')
                        } else {
                          alert('Failed to save settings')
                        }
                      })
                    axios.post('/api/tasks/saveTasks', tasks)
                      .then(response => {
                        if (response.data.success) {
                          // alert('Settings were saved')
                        } else {
                          alert('Failed to save settings')
                        }
                      })
                  } else {
                    alert('Failed to get data by username')
                  }
                })
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
              console.log(response.payload.err)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="container">
            <Title level={2} id="title">Sign Up</Title>
            <Form style={{ minWidth: '200px' }} {...formItemLayout} onSubmit={handleSubmit} >

              <Form.Item style={{ color: 'white' }} required label="Username">
                <Input
                  id="username"
                  placeholder="Enter your Username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username ? 'text-input error' : 'text-input'
                  }
                />
                {errors.username && touched.username && (
                  <div className="input-feedback">{errors.username}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <div id="password-protect">
                <p>In order to <strong>protect your account</strong>, make sure your password:</p>
                <ul>
                  <li>Contains 8 or more characters</li>
                  <li>Contains at least one uppercase letter</li>
                  <li>Contains at least one number</li>
                  <li>Does not match or significantly contain your username</li>
                </ul>
              </div>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage;