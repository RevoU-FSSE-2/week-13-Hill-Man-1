import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

    interface LoginValues {
    email: string;
    password: string;
    }

    const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    });

    const Login: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (values: LoginValues) => {
        try {
        setError(null);
    
        
        const response = await fetch('https://mock-api.arikmpt.com/api/user/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    
        
        if (response.status === 200) {
            const responseData = await response.json();
    
            if (responseData.token) {
            
            localStorage.setItem('authToken', responseData.token);
            localStorage.setItem('token', responseData.token);
            }
    
            console.log('Login successful', responseData);
            navigate('/home');
        } else {
            
            const errorData = await response.json();
            setError(errorData.message || 'Network error');
        }
        } catch (error) {
        console.error('Error while logging in:', error);
        setError('Network error');
        }
    };
    

    return (
        <section className="vh-100 gradient-custom">
        <div className="container py-3 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your email and password!</p>
                    <Formik
                        initialValues={{
                        email: '',
                        password: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={handleLogin}
                    >
                        <Form>
                        <div>
                            <label className="form-label" htmlFor="typeEmailX">
                            Email
                            </label>
                            <Field
                            name="email"
                            type="email"
                            className="form-control form-control-lg form-outline form-white"
                            />
                            <div className="text-danger">
                            <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div>
                            <label className="form-label pt-2" htmlFor="typePasswordX">
                            Password
                            </label>
                            <Field
                            name="password"
                            type="password"
                            id="typePasswordX"
                            className="form-control form-control-lg form-outline form-white"
                            />
                            <div className="text-danger">
                            <ErrorMessage name="password" />
                            </div>
                        </div>
                        {error && <div className="text-danger mt-3">{error}</div>} 
                        <p className="small mb-5 pb-lg-2 mt-5">
                            <a className="text-white-50" href="#!">
                            Forgot password?
                            </a>
                        </p>
                        <button className="btn btn-outline-light btn-lg px-5" type="submit">
                            Login
                        </button>
                        </Form>
                    </Formik>
                    </div>
                    <div>
                    <p className="mb-0">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-white-50 fw-bold">
                        Sign Up
                        </Link>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
    };

    export default Login;
