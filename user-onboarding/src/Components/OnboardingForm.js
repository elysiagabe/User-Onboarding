import React from "react";
import { withFormik, Form, Field } from "formik";

const OnboardingForm = ({values}) => {
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
                </label>

                <label htmlFor="email">
                    Email: 
                    <Field 
                        id="email" 
                        type="email" 
                        name="email" 
                    />
                </label>

                <label htmlFor="password">
                    Password: 
                    <Field 
                        id="password"
                        type="password"
                        name="password"
                    />
                </label>

                <label htmlFor="acceptTerms">
                    <Field 
                        id="acceptTerms"
                        type="checkbox"
                        name="acceptTerms"
                        checked={values.acceptTerms}
                    />
                    I have read through and agree to the terms of service.
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
    }
})(OnboardingForm);

export default FormikOnboardingForm;