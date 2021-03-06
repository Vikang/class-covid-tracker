import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom'
import Axios from 'axios';
function Login() {
    const [computingID, setComputingID] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const signIn = e => {
        e.preventDefault(); //prevent page from refreshing
        Axios.get('http://localhost:3001/api/signin', { params: {
            computingID: computingID, 
            password: password
        }
            
        }).then((response)=>{
            // alert(response.data);
            setUser(computingID);
            alert(user);
        });
        //fancy deployment login here
    };

    /*const register = e => {
        e.preventDefault();
         //fancy deployment register here
    }
    */
    return (
        <div className="login">
            <img
                    className="login__logo"
                    src='https://www.yworks.com/assets/images/support/COVID-19.bf2a287a.png'
                    alt="Logo"
            />
            <h2 className="login__header">CS 4750 COVID Tracker</h2>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>UVA Computing ID</h5>
                    <input type='text'value={computingID} 
                    onChange= {e => setComputingID(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input type='password' value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    />


                    <button
                        type="submit"
                        onClick={signIn}
                        className="login__signInButton">
                        Sign In
                    </button>
                </form>
                <p>
                    By signing-in you agree to the CS 4750 COVID-19 TRACKER Conditions of Use. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <Link to ="/register">
                    <button 
                    renderAs="button"
                    //onClick={register}
                    className='login__registerButton'>
                    Create your CS 4750 COVID TRACKER Account
                    </button>
                </Link>
            </div>       
        </div>
    )
}

export default Login
