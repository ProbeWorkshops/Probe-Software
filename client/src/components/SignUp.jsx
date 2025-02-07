import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

function SignUp() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function signup(event) {
    event.preventDefault();

    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Basic validation
      if (!name) {
        toast.error("Please enter your name!");
        return;
      }
      if (!email) {
        toast.error("Please enter your email!");
        return;
      }
      if (!password) {
        toast.error("Please enter your password!");
        return;
      }

      // Prepare the data for POST request
      const data = {
        name,
        email,
        password,
      };

      // Make the POST request using Axios
      const response = await axios.post('http://127.0.0.1:5000/register', data);

      // Handle the response
      if (response.data.status === 1) {
        console.log(response.data)
        toast.success(response.data.message, {
          onClose: () => {
            navigate('/');
          },
        });
      } else {
        toast.error(response.data.message || "Registration failed!");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again later."
      );
    }
  }

  return (
    <div className="signin-container">
      <section className="signin-section">
        <div className="signin-content">
          <p href="#" className="signin-logo">
            Probe
          </p>
          <div className="signin-form-wrapper">
            <div className="signin-form-container">
              <h1>Create your account</h1>
              <form onSubmit={signup} className="signin-form">
                <div className="signin-input-group">
                  <label htmlFor="name">Name</label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="signin-input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="signin-input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                </div>

                <button type="submit" className="signin-button">
                  Sign Up
                </button>

                <p className="signin-link">
                  Already have an account?{' '}
                  <a onClick={() => navigate('/')}>Sign In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default SignUp;
