import React , { useState } from 'react';
import './Report.css';
import { DropdownList, SelectList, Multiselect } from 'react-widgets'
import "react-widgets/dist/css/react-widgets.css";
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom'
import Axios from 'axios';

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
    const [computingID, setComputingID] = useState('');
    const [reportID, setReportID] = useState('');
    const [status, setStatus] = useState('');
    const [severity, setSeverity] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const report = e => {
        e.preventDefault(); //prevent page from refreshing
        Axios.post('http://localhost:3001/api/report', {
            computingID : computingID,
            reportID: reportID,
            status: status, 
            severity: severity,
            symptoms: symptoms
              
        }).then((response)=>{
            // alert(response.data);
            // setUser(computingID);
            alert(response.data);
        });
}


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
                    
                    <h5>UVA Computing ID</h5>
                    <input type='text'value={computingID} 
                    onChange= {e => setComputingID(e.target.value)}
                    />
                    <h5>Report ID Number</h5>
                    <input type='text'value={reportID} 
                    onChange= {e => setReportID(e.target.value)}
                    />
                    <h5>Status of Illness? (Positive, Negative, Recovered)</h5>
                    <input type='text'value={status} 
                    onChange= {e => setStatus(e.target.value)}
                    />
                    <h5>Severity (0-5)</h5>
                    <input type='text'value={severity} 
                    onChange= {e => setSeverity(e.target.value)}
                    />
                    <h5>Symptoms(please list all)</h5>
                    <input type='text'value={symptoms} 
                    onChange= {e => setSymptoms(e.target.value)}
                    />

                    <button 
                    className="report__reportButton"
                    type="submit"
                    onClick={report}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Report
