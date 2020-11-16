import React, { useState } from "react";
import './Appointment.css';
import { SelectList, Multiselect } from 'react-widgets'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Axios from 'axios';

const submit = e => {
    e.preventDefault(); //prevent page from refreshing
    alert('You have submitted the form.')
    //fancy deployment login here
}
function Appointment() {
    /*
    const [submitting, setSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState(false);
    const hospital = [
        {id:'student', name:"UVA Student Health and Wellness"},
        {id: 'uva', name:"UVA University Hospital"},
        {id: 'children', name:"UVA Children's Hospital"}
    ];
    const times = ['9:00 am - 10:00 am',
    '10:00 am - 11:00 am',
    '11:00 am - 12:00 pm',
    '12:00 pm - 1:00 pm',
    '1:00 pm - 2:00 pm',
    '2:00 pm - 3:00 pm',
    '3:00 pm - 4:00 pm',
    '4:00 pm - 5:00 pm',
    ];
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
    */
   const [computingID, setComputingID] = useState('');
   const [apptID, setApptID] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const appointment = e => {
        e.preventDefault(); //prevent page from refreshing
        Axios.post('http://localhost:3001/api/appointment', {
            computingID : computingID,
            apptID : apptID,
            day: day,
            time: time, 
            location: location,
            symptoms: symptoms
              
        }).then((response)=>{
            // alert(response.data);
            // setUser(computingID);
            alert(response.data);
        });
}

      
    return (
        <div className="appointment">
            <img
                className="register__logo"
                src='https://www.yworks.com/assets/images/support/COVID-19.bf2a287a.png'
                alt="Logo"
            />
            <h2 className="appointment__header">CS 4750 COVID Tracker</h2>
            <div className="appointment__container">
                <form
                    onSubmit={submit}
                >
                    <h1>Request an Appointment</h1>
                    <h5>UVA Computing ID</h5>
                    <input type='text'value={computingID} 
                    onChange= {e => setComputingID(e.target.value)}
                    />
                    <h5>Appointment ID</h5>
                    <input type='text'value={apptID} 
                    onChange= {e => setApptID(e.target.value)}
                    />
                    <h5>What day(s) are you avaliable?</h5>
                    <input type='text'value={day} 
                    onChange= {e => setDay(e.target.value)}
                    />
                    <h5>What time do you prefer to meet?</h5>
                    <input type='text'value={time} 
                    onChange= {e => setTime(e.target.value)}
                    />
                    <h5>Which hospital would you like to meet at? (UVA Student Health and Wellness, UVA University Hospital, UVA Children's Hospital)</h5>
                    <input type='text'value={location} 
                    onChange= {e => setLocation(e.target.value)}
                    />
                    <h5>Symptoms(please list all)</h5>
                    <input type='text'value={symptoms} 
                    onChange= {e => setSymptoms(e.target.value)}
                    />
                    <button 
                        classname="appointment__appointmentButton" 
                        type="submit"
                        onClick={appointment}>
                        Submit
                    </button>
                </form>
            </div>
            <h2>Your List of Appointment Requests</h2>
        </div>
        )
    }


export default Appointment;
