import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

    const Register: React.FC = () => {
    const navigate = useNavigate();

    // Define the validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Your Name is required'),
        email: Yup.string().email('Invalid email').required('Your Email is required'),
        password: Yup.string()
        .min(4, 'Password must be at least 4 characters long')
        .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
        // Send a POST request to your registration endpoint with values
        // Example using fetch:
        const response = await fetch('https://mock-api.arikmpt.com/api/user/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (response.status === 201) {
            console.log('Registration successful');
            // Redirect to the login page upon successful registration
            navigate('/login');
        } else {
            console.log('Registration failed');
            // Handle registration failure (e.g., show an error message)
        }
        } catch (error) {
        console.error('Error during registration:', error);
        // Handle any network or other errors
        } finally {
        setSubmitting(false); // Ensure form is not in a submitting state
        }
    };

    return (
        <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                    <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <Formik
                        initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                        <Form>
                            <div className="form-outline mb-4">
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className="form-control form-control-lg"
                                placeholder="Your Name"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>

                            <div className="form-outline mb-4">
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className="form-control form-control-lg"
                                placeholder="Your Email"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>

                            <div className="form-outline mb-4">
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-control form-control-lg"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            <div className="form-outline mb-4">
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control form-control-lg"
                                placeholder="Repeat your password"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-danger"
                            />
                            </div>

                            <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                            </div>

                            <p className="text-center text-muted mt-5 mb-0">
                            Have already an account?{' '}
                            <Link to="/" className="fw-bold text-body">
                                <u>Login here</u>
                            </Link>
                            </p>
                        </Form>
                        )}
                    </Formik>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    };

export default Register;
