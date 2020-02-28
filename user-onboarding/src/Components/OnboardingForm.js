import React, { useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({values, touched, errors, status}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("Status has changed", status)
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <h2>New User Info:</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Shhh...their top-secret password: {user.password}</p>
                </div>
            ))}

            <Form className="onboarding-form">
                <div className="form-header">
                    <h2>Create Your Account</h2>
                    <p>It's quick and easy to sign up for an account. Just complete the form below, and you'll be good to go!</p>
                </div>
                <label htmlFor="name">
                    Name <br />
                    <Field 
                        id="name" 
                        type="text" 
                        name="name" 
                    />
                    <div className="error-message">{touched.name && errors.name && <p>*{errors.name}</p>}</div>
                </label>

                <label htmlFor="email">
                    Email <br />
                    <Field 
                        id="email" 
                        type="email" 
                        name="email" 
                    />
                    <div className="error-message">{touched.email && errors.email && <p>*{errors.email}</p>}</div>
                </label>

                <label htmlFor="password">
                    Password <br />
                    <Field 
                        id="password"
                        type="password"
                        name="password"
                    />
                    <div className="error-message">{touched.password && errors.password && <p>*{errors.password}</p>}</div>
                </label>

                <div className="checkbox-wrapper">
                    <label htmlFor="acceptTerms">
                        <Field 
                            id="acceptTerms"
                            type="checkbox"
                            name="acceptTerms"
                            checked={values.acceptTerms}
                        />
                        I have read through and agree to the terms of service.
                        <div className="error-message">{touched.acceptTerms && errors.acceptTerms && <p>*{errors.acceptTerms}</p>}</div>
                    </label>
                </div>

                <button type="submit">Submit ></button>
            </Form>
        </div>
    )
}

const FormikOnboardingForm = withFormik({
    mapPropsToValues({name, email, password, acceptTerms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            acceptTerms: acceptTerms || false,
        }
    },
    // ==== begin validation schema ==== //
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3, "Try again! Your name must be at least 3 characters.")
            .required("Enter your name"),
        email: Yup.string()
            .email("Try again! A valid email address must contain a single @ symbol.")
            .required("Enter your email address")
            .notOneOf(["waffle@syrup.com"], "Woops! That email is already taken. Need help logging in?"),
        password: Yup.string()
            .min(8, "Try again! Your password must contain at least 8 characters.")
            .required("Enter a secure password"),
        acceptTerms: Yup.boolean()
            .oneOf([true], "Please agree to our terms of service")
    }),
    // ==== end validation schema ==== //

    // ==== begin handle submit & POST request ==== //
    handleSubmit(values, {setStatus, resetForm}) {
        console.log("Submitting...", values);
        axios.post("https://reqres.in/api/users", values)
            .then(response => {
                console.log("Success!", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(err => console.log("Oops! There was an issue handling your request", err));
    }
    // ==== end handle submit & POST request ==== // 
})(OnboardingForm);

export default FormikOnboardingForm;