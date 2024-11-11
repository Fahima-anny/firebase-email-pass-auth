import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [error, setError] = useState(false) ;
    const [success, setSuccess] = useState('') ;
    const emailRef = useRef() ;

    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.pass.value;

setError('') ;
setSuccess('') ;

        signInWithEmailAndPassword(auth, email, pass)
        .then(res => {
            console.log(res.user)

            if(!res.user.emailVerified){
                setError('Please verify your email')
                return
            }
            else{
                setSuccess(true)
            }
        })
        .catch(  er =>
          { console.log(er)
            setError(er.message)
        })
    }

    const handleForgot = () => {
        // console.log("email reset", emailRef.current.value)
const email = emailRef.current.value ;
if(!email){
    alert('please provide a valid email')
}
else{
    sendPasswordResetEmail(auth, email)
    .then(() => {
        alert('reset password has been sent to your email')
    })
}
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="pass" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" onClick={handleForgot} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                            {
                                success && <p className="text-green-600">Logged in successfully</p>
                            }
                            {
                                error && <p className="text-red-600">{error}</p>
                            }
                            <p className="mt-2">Don't have an account? <Link to='/register' className="font-bold text-primary">Register Now</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;