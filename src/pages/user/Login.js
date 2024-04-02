



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

  const handleSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/slide');
    }
  }, [navigate]);

  const handleonSubmit = async (data) => {
    try {
      const { email, password } = data;
      dispatch(loginUser(email, password, setError)); // Dispatch loginUser action
      setError('');
      toast.success(message.LOGIN, {
        ...toaststyle,
        onClose: () => navigate('/slide') // Redirect after toast is closed
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
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3}$/i,
                          message: 'Invalid email format'
                        }
                      })}
                      className="form-control21 form-control-lg"
                      placeholder="Email"
                    />
                    {errors.email && <div style={{ color: 'red', display: 'block' }}>{errors.email.message}</div>}
                  </div>
                  <div className="form-outline form-white mb-8" style={{ marginBottom: '20px' }}>
                    <input
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                          message: 'Please Enter Valid Password'
                        }
                      })}
                      className="form-control21 form-control-lg"
                      placeholder="Password"
                    />
                    {errors.password && <div style={{ color: 'red', display: 'block' }}>{errors.password.message}</div>}
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

export default Login;
