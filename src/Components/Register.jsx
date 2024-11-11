import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase.init';
import { Link } from 'react-router-dom';

const Register = () => {

const handleFormSubmit = (e) => {
e.preventDefault() ;
const email = e.target.email.value ;
const pass = e.target.pass.value ;
const name = e.target.name.value ;
const photo = e.target.photo.value ;
console.log(email, pass, name, photo) ;

// create new user with email and pass 
createUserWithEmailAndPassword(auth, email, pass)
.then( res => {
  console.log(res.user) ;
  sendEmailVerification(auth.currentUser)
  .then(() => console.log('verification email sent'))
})
.catch( er => {
  console.log("ERRORRR:", er) ;
})
}

    return (
        <div>
           <h1 className='text-accent my-4 font-bold text-5xl'>Register</h1>
           <form onSubmit={handleFormSubmit} className="card-body max-w-md mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input name='name' type="text" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo url</span>
          </label>
          <input name='photo' type="text" placeholder="Photo url" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name='email' type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name='pass' type="password" placeholder="password" className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-accent text-white">Login</button>
          <p className='mt-2'>Already have an account? <Link to='/login' className='text-accent font-bold'>Login</Link></p>
        </div>
      </form>
        </div>
    );
};

export default Register;