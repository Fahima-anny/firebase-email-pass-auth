import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Signup = () => {

    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;
        const terms = form.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        console.log(email, pass, terms, name, photo)

        // empty the error message 
        setError('')

        // validation
        if (!terms) {
            setError('Please accept our terms and conditions.')
            return;
        }

        if (pass.length < 6) {
            setError('Password mush be atleast 6 characters or more')
            return;
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

        if (!regex.test(pass)) {
            setError('Your Password must contain 1 uppercase, 1 lowercase, 1 special character, 1 number')
            return;
        }


        createUserWithEmailAndPassword(auth, email, pass)
            .then(res => {
                console.log(res.user)
       const profile = {
        displayName: name ,
        photoURL : photo
       }
                
// update user photo and name 
updateProfile(auth.currentUser, profile)
.then( () => console.log('user updated') )
.catch( er => console.log(er) )

            })
            .catch(er => {
                console.log(er.message)
                setError(er.message)
            })
    }

    return (
        <div className="card bg-base-100 mx-auto my-5 w-full max-w-md shrink-0 shadow-2xl">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <form onSubmit={handleSubmit} className="card-body">
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
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPass ? "text" : "password"}
                        name='pass'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button onClick={() => setShowPass(!showPass)} className="absolute top-12 right-2">
                        {
                            showPass ? <FaEyeSlash /> : <FaEye />
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <div className="form-control ">
                        <label className="label text-left justify-start gap-2 cursor-pointer">
                            <input type="checkbox" name='terms' className="checkbox checkbox-primary" />
                            <span className="label-text">Accept out terms and conditions</span>
                        </label>
                    </div>
                    <button className="btn btn-primary mt-3">Sign up</button>
                </div>
            </form>
            {
                error ? <p className="text-red-500">{error}</p> : <p className="text-green-500">New account created!!</p>
            }
        </div>
    );
};

export default Signup;