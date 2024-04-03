




import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { isLoggedIn } from '../../utils/authUtils';
import { loginUser } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {message,errormessage,toaststyle} from '../../constant/Message'

const Login = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/product');
    }
  }, [navigate]);

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)) {
      setPasswordError('Please Enter Valid Password ');
    } else {
      setPasswordError('');
    }
  };

  const handleonSubmit = async (data) => {
    try {
      const { email, password } = data;
      dispatch(loginUser(email, password, setError)); // Dispatch loginUser action
      setError('');
      toast.success(message.LOGIN, {
        ...toaststyle,
        onClose: () => navigate('/product') // Redirect after toast is closed
      });
    } catch (error) {
      toast.error(errormessage.LOGINFAIL, {
        ...toaststyle,
       
      });
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container21 py-5 h-100 align-items-center">
      <div className="row21 d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card21 bg-dark text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your email and password!</p>
                <form onSubmit={handleSubmit(handleonSubmit)}>
                  <div className="form-outline form-white mb-8" style={{ marginBottom: '20px' }}>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        
                      })}
                      onChange={(e) => validateEmail(e.target.value)}
                      className="form-control21 form-control-lg"
                      placeholder="Email"
                    />
                    {emailError && <span style={{ color: 'red' , display:'block' }}>{emailError}</span>}
                  </div>
                  <div className="form-outline form-white mb-8" style={{ marginBottom: '20px' }}>
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        
                      })}
                      onChange={(e) => validatePassword(e.target.value)}
                      className="form-control21 form-control-lg"
                      placeholder="Password"
                    />
                    {passwordError && <span style={{ color: 'red' , display:'block' }}>{passwordError}</span>}
                  </div>
                  <input type="submit" className=" mb-8 btn btn-primary btn-lg px-5" value="Login" />
                  {error && <div style={{ color: 'red', display: 'block' }}>{error}</div>}
                </form>
                <p className='' style={{ marginTop: '5px', marginRight: '0px' }}>Don't have an account?
                  <button className="btn btn-primary btn-xl px-3" style={{ marginLeft: '5px' }} onClick={() => handleSignUp()}>
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;  // without onchange

