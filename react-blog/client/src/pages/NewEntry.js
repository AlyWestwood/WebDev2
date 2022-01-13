import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewEntry() {

    let navigate = useNavigate();

    const initialValues = {
        title: "",
        body: "",
        username: ""
    }

    const onSubmit = data => {
        axios.post('/entries', data).then( res => {
            navigate("/");
        });
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required(),
        body: yup.string().required(),
        username: yup.string().min(3).max(15).required()
    });

    return (
        <div className="newEntryPage">
            {/* <Formik> */}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='formContainer'>
                <label>Title</label>
                <ErrorMessage name="title" component="span" />
                <Field className="inputNewEntry" id="newEntryTitle" name="title" placeholder="(Ex. Title)" />
                <label>Entry text</label>
                <ErrorMessage name="entryBody" component="span" />
                <Field className="inputNewEntry" id="newEntryBody" name="body" placeholder="Start writing" />
                <label>Author</label>
                <ErrorMessage name="username" component="span" />
                <Field className="inputNewEntry" id="newEntryAuthor" name="username" placeholder="(Ex. Jane123)" />

                <button type="submit">Publish</button>
                </Form>
            </Formik>
        </div>
    )
}

export default NewEntry
