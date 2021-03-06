import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Register.css';
import Axios from 'axios';
function Register() {
    const [computingID, setComputingID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const register = e => {
        e.preventDefault(); //prevent page from refreshing
        Axios.post('http://localhost:3001/api/register', { 
            computingID: computingID, 
            password: password,
            confirmPassword: confirmPassword
        
            
        }).then((response)=>{
            // alert(response.data);
            // setUser(computingID);
            alert(response.data);
        });
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
                    <p>
                    <Link to='/login'>
                        Login
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
