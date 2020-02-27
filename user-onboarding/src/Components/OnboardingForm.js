import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({values, touched, errors}) => {
    return (
        <div>
            <Form>
                <label htmlFor="name">
                    Name: 
                    <Field 
                        id="name" 
                        type="text" 
                        name="name" 
                    />
                    {touched.name && errors.name && <p>{errors.name}</p>}
                </label>

                <label htmlFor="email">
                    Email: 
                    <Field 
                        id="email" 
                        type="email" 
                        name="email" 
                    />
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </label>

                <label htmlFor="password">
                    Password: 
                    <Field 
                        id="password"
                        type="password"
                        name="password"
                    />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </label>

                <label htmlFor="acceptTerms">
                    <Field 
                        id="acceptTerms"
                        type="checkbox"
                        name="acceptTerms"
                        checked={values.acceptTerms}
                    />
                    I have read through and agree to the terms of service.
                    {touched.acceptTerms && errors.acceptTerms && <p>{errors.acceptTerms}</p>}
                </label>

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
            .required("Enter your email address"),
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