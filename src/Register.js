import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Register.css';

function Register() {
    const [computingID, setComputingID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = e => {
        e.preventDefault();
        
         //fancy deployment register here
    }

    return (
        <div className="register">
            <img
                className="register__logo"
                src='https://www.yworks.com/assets/images/support/COVID-19.bf2a287a.png'
                alt="Logo"
            />
            <h2 className="register__header">CS 4750 COVID Tracker</h2>
            <div className="register__container">
                <h1>Create An Account</h1>
                <form>
                    <h5>UVA Computing ID</h5>
                    <input type='text'value={computingID} 
                    onChange= {e => setComputingID(e.target.value)}
                    />

                    <h5>Password</h5>
                    <input type='password' value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    />

                    <h5>Confirm Password</h5>
                    <input type='password' value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)} 
                    />

                    <button
                        type="submit"
                        onClick={register}
                        
                        className="register__registerButton">
                        Register
                    </button>
                    <p>Already have an account?</p>
                    <Link to='/login'>
                        <p>Login</p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register
