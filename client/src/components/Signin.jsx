import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function signin(event) {
    event.preventDefault();
  
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
  
      // Basic validation
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
        username: email, // Ensure this matches your backend key
        password,
      };
  
      // Make the POST request using Axios
      const response = await axios.post('http://127.0.0.1:5000/login', data);
  
      // Handle the response
      if (response.status === 200) {
        const { token, username, message } = response.data;
  
        // Store token and username in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
  
        toast.success(message, {
          onClose: () => {
            navigate('/home');
          },
        });
      } else {
        toast.error(response.data.message || "Login failed!");
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
          <p className="signin-logo">Probe</p>
          <div className="signin-form-wrapper">
            <div className="signin-form-container">
              <h1>Sign in to your account</h1>
              <form onSubmit={signin} className="signin-form">
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
                  Sign In
                </button>
                <p className="signup-link">
                  Don’t have an account yet?{" "}
                  <a onClick={() => navigate('/signup')}>Sign up</a>
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

export default SignIn;
