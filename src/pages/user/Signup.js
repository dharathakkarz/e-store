

// import React from 'react';
// import { useForm } from 'react-hook-form'; 
// import { useDispatch } from 'react-redux';
// import { signupRequest } from '../../redux/actions/UserAction';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = (data) => {
//     // Dispatch signup action
//     dispatch(signupRequest(data));
//     // Store user data in local storage
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     users.push(data);
//     localStorage.setItem('users', JSON.stringify(users));
//     // Redirect to login page
//     navigate('/login');
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" {...register('username', { required: true })} placeholder="Username" />
//       {errors.username && <span>Username is required</span>} 
    
//       <input type="email" {...register('email', { required: true })} placeholder="Email" />
//       {errors.email && <span>Email is required</span>}
      
//       <input type="password" {...register('password', { required: true })} placeholder="Password" />
//       {errors.password && <span>Password is required</span>} 
      
//       <input type="submit" value="Sign Up" />
//     </form>
//   );
// };

// export default Signup;



import React from 'react';
import'../../assets/login.scss'
import { useForm } from 'react-hook-form'; 
import { useDispatch } from 'react-redux';
import { signupRequest } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate('/login');
  };

  const onSubmit = (data) => {
    // Dispatch signup action
    dispatch(signupRequest(data));
    // Store user data in local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    // Redirect to login page
    navigate('/login');
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-outline form-white mb-4" style={{ marginBottom: '20px' }}>
                      <input type="text" {...register('username', { required: true })} className="form-control form-control-lg" placeholder="Username" />
                      {errors.username && <span>Username is required</span>}
                    </div>

                    <div className="form-outline form-white mb-4" style={{ marginBottom: '20px' }}>
                      <input type="email" {...register('email', { required: true })} className="form-control form-control-lg" placeholder="Email" />
                      {errors.email && <span>Email is required</span>}
                    </div>

                    <div className="form-outline form-white mb-4" style={{ marginBottom: '20px' }}>
                      <input type="password" {...register('password', { required: true })} className="form-control form-control-lg" placeholder="Password" />
                      {errors.password && <span>Password is required</span>}
                    </div>

                    <input type="submit" className="btn btn-primary btn-lg px-5" value="Sign Up" />
                  </form>

                  <p style={{ marginTop:'5px' , marginRight:'0px'}}>  already have an account?
                    <button className="btn btn-primary btn-XL px-3"  style={{ marginLeft:'5px' }} onClick={() => handlelogin()}>
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
