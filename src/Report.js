import React from 'react';
import './Report.css';
import { DropdownList, SelectList, Multiselect } from 'react-widgets'
import "react-widgets/dist/css/react-widgets.css";
import { render } from '@testing-library/react';

const submit = e => {
    e.preventDefault(); //prevent page from refreshing
    alert('You have submitted the form.')
    //fancy deployment login here
}
const status = [
    {id: 'positive', name: 'I have tested positive for COVID-19'},
    {id: 'recovered', name: 'I have recovered from COVID-19'},
    {id: 'negative', name: 'I have never tested positive for COVID-19'},
];
const location = ['On Grounds', 'Not on Grounds']
const severity = ['0','1','2','3','4','5']
const symptoms = ['Fever or chills',
    'Cough',
    'Shortness of breath or difficulty breathing',
    'Fatigue',
    'Muscle or body aches',
    'Headache',
    'New loss of taste or smell',
    'Sore throat',
    'Congestion or runny nose',
    'Nausea or vomiting',
    'Diarrhea'];

function Report() {
render(Report);
    return (
        <div className="report">
            <img
                className="report__logo"
                src='https://www.yworks.com/assets/images/support/COVID-19.bf2a287a.png'
                alt="Logo"
            />
            <h2 className="report__header">CS 4750 COVID Tracker</h2>
            <div className="report__container">
                <h1>Report Health Status</h1>
                <form onSubmit={submit}>
                    <label className="report__title">
                        Your Health Status
                    </label>
                        <SelectList 
                        data={status}
                        valueField='id'
                        textField='name'
                         />
                    <label className="report__title">
                        Your Location
                    </label>
                        <SelectList data={location} />
                    <label className="report__title">
                        Severity (No symptoms"0"---Moderate "3"---Severe "5")
                    </label>
                        <DropdownList data={severity} />
                    <label className="report__title">
                        Symptoms (Select all that apply)
                    </label>
                        <Multiselect 
                        data={symptoms} />
                    <button 
                    className="report__reportButton"
                    type="submit"
                    onClick={submit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Report
