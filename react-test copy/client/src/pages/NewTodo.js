import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewTodo() {

    let navigate = useNavigate();

    const initialValues = {
        task: "",
        dueDate: "",
        isDone: false
    }

    const onSubmit = todo => {
        axios.post('/todos', todo, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then( res => {
            navigate("/");
        });
    }

    const validationSchema = yup.object().shape({
        task: yup.string().max(100).required(),
        dueDate: yup.date().required(),
        isDone: yup.boolean().required()
    });

    return (
        <div className="NewTodoPage">
            {/* <Formik> */}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                <label className='form-label' htmlFor='NewTodoTask'>Task</label>
                <ErrorMessage name="task" component="span" />
                <Field className="inputNewTodo form-control" id="NewTodoTask" name="task" placeholder="(Ex. Walk the cat)" />
                <label className='form-label' htmlFor='NewTodoDate'>Due date</label>
                <ErrorMessage name="dueDate" component="span" />
                <Field className="inputNewTodo form-control" id="NewTodoDate" name="dueDate" type="date" />
                <label className='form-label' htmlFor='NewTodoIsDone'>Is done</label>
                <ErrorMessage name="isDone" component="span" />
                <Field className="inputNewTodo form-check-input" id="NewTodoIsDone" name="isDone" type="checkbox" />

                <button className="btn btn-primary" type="submit">Publish</button>
                </Form>
            </Formik>
        </div>
    )
}

export default NewTodo
