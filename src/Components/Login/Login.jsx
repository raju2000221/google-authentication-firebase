import React, { useState } from 'react';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setuser] =useState(null)
    const auth = getAuth(app)
    console.log(app)
    const provider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();

    const handlegooglesignin = () =>{
       signInWithPopup(auth, provider)
       .then(result =>{
        const Loginuser =result.user;
        console.log(Loginuser)
        setuser(Loginuser)
       
       })
       .catch(error =>{
        console.log('error', error.message)
       })
    }

    const handlegooglesignOut = () =>{
        signOut(auth)
        .then(result =>{
            setuser(null)
            console.log('signout')
        })
        .catch(error => {
            console.log(error)
        })
    }
    const handlegithubSignin =()=>{
        signInWithPopup(auth, gitProvider)
        .then(result =>{
            const Loginuser =result.user;
            console.log(Loginuser)
            setuser(Loginuser)
           
           })
           .catch(error =>{
            console.log('error', error.message)
           })
    }
    return (
        <div>
            {
                !user ?
               <>
                <button onClick={handlegooglesignin}>Google login</button>
                <button onClick={handlegithubSignin}>github Login</button>
               </>
                :
            <button onClick={handlegooglesignOut}>sign Out</button>}
          {
           user && <div>
                <h3>
                user:{user.displayName}
               
                </h3>
                <p> email:{user.email}</p>
                <img src={user.photoURL} alt="" />
                </div>
                }
        </div>
    );
};

export default Login;