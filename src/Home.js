import React from 'react'; //rfce
import { Link } from 'react-router-dom'
import "./Home.css"


function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://www.kansashealthsystem.com/-/media/Project/Website/Hero/COVID_19_iS1210596217_hero.jpg?h=586&w=1440&la=en&hash=3A4249B74E86D825663533596DB0C1E58E2E2115"
                    alt=""
                />
                <div class="centered">
                    <h1 className="home__header">Welcome CS 4750 Fall 2020 Student</h1>
                    <p>Have you tested positive for COVID-19?</p>
                    <p>Please track your health status now!</p>
                    <Link to ="/report">
                    <button 
                        renderAs="button"
                        className="home__button">Report Positive Result
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
