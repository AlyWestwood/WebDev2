import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Registration() {
    const initialValues = {
        username: "",
        password: ""
    };

    const validationSchema = yup.object().shape({
        username: yup.string().min(3).max(20).required(),
        password: yup.string().min(4).max(20).required()
    });

    const onSubmit = newUser => {
        axios.post("/auth", newUser).then(res => {
          console.log(res.data);
          navigate('/login');
        });
    };

    const navigate = useNavigate();

    return (
        <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              className="inputNewEntry"
              name="username"
              placeholder="(Ex. John123...)"
            />
  
            <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              type="password"
              className="inputNewEntry"
              name="password"
              placeholder="Your Password..."
            />
  
            <button type="submit"> Register</button>
          </Form>
        </Formik>
      </div>    )
}

export default Registration;
