

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from '../../utils/authUtils';
import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';
import {message,errormessage,toaststyle} from '../../constant/Message'

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handlelogin = () => {
    navigate('/login');
  };


  React.useEffect(() => {
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
  const onSubmit = (data) => {
    if (emailError || passwordError) {
      return;
    }

    // Check if user with the same email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === data.email);
    if (existingUser) {
      toast.error(errormessage.EMAILEXISTS, {
        ...toaststyle,
    
      });
      return;
    }

    // Dispatch signup action if no existing user found
    dispatch(signupRequest(data));
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success(message.SIGNUP, {
      ...toaststyle,
      onClose: () => navigate('/login') 
      
    });
    
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container31 py-5 h-100">
        <div className="row31 d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card31 bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-4" style={{ marginBottom: '20px' }}>
                      <input type="text" {...register('username', { required: true })} className="form-control31 form-control-lg" placeholder="Username" />
                      {errors.username && <span style={{ color: 'red' , display:'block' }}>Username is required</span>}
                    </div>
                    <div className="form-outline form-white mb-4" style={{ marginBottom: '20px' }}>
                      <input type="email" {...register('email')} className="form-control31 form-control-lg" placeholder="Email" onChange={(e) => validateEmail(e.target.value)} />
                      {emailError && <span style={{ color: 'red' , display:'block' }}>{emailError}</span>}
                    </div>

                    <div className="form-outline form-white mb-4" style={{ marginBottom: '20px' }}>
                      <input type="password" {...register('password', { required: true })} className="form-control31 form-control-lg" placeholder="Password" onChange={(e) => validatePassword(e.target.value)} />
                      {passwordError && <span style={{ color: 'red' , display:'block' }}>{passwordError}</span>}
                    </div>

                    <input type="submit" className="btn btn-primary btn-lg px-5" value="Sign Up" />
                  </form>

                  <p style={{ marginTop: '5px', marginRight: '0px' }}>  already have an account?
                    <button className="btn btn-primary btn-XL px-3" style={{ marginLeft: '5px' }} onClick={() => handlelogin()}>
                      Login
                    </button>
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

export default Signup;

