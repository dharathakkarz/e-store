
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleSignUp = () => {
    navigate('/signup');
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(loginUser(email, password, navigate, setError)); // Dispatch loginUser action
  };

  return (
   
      <div className="container py-5 h-100 align-items-center ">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your email and password!</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-8" style={{ marginBottom: '20px' }}>
                      <input type="email" {...register('email', { required: true })} className="form-control form-control-lg" placeholder="Email" />
                      {errors.email && <div>Email is required</div>}
                    </div>

                    <div className="form-outline form-white mb-8" style={{ marginBottom: '20px' }}>
                      <input type="password" {...register('password', { required: true })} className="form-control form-control-lg" placeholder="Password" />
                      {errors.password && <div>Password is required</div>}
                    </div>

                    <input type="submit" className=" mb-8 btn btn-primary btn-lg px-5" value="Login" />
                    {error && <div>{error}</div>}
                  </form>
                  <p className=''style={{ marginTop:'5px' , marginRight:'0px'}} >Don't have an account?
                    <button className="btn btn-primary btn-xl px-3 "  style={{ marginLeft:'5px' }} onClick={() => handleSignUp()}>
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

