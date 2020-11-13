import React, { useReducer, useState } from "react";
import { DropdownList, SelectList, Multiselect } from 'react-widgets'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Appointment.css';


function Appointment() {
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
    const submit = e => {
        e.preventDefault();
        setSubmitting(true);
    
        setTimeout(() => {
            setSubmitting(false);
          }, 3000)
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
                <label className="question">Choose an available day for your appointment: </label>
                <DatePicker 
                    selected={selectedDate} 
                    onChange={date => setSelectedDate(date)}
                    dateFormat='MM/dd/yyyy'
                />
                <label className="question">Choose an available time for your appointment</label>
                <Multiselect 
                      data={times} /> 
                <label className="question">
                    <p name="Location">Hospital Location</p>
                    <SelectList 
                        data={hospital}
                        valueField='id'
                        textField='name'
                        />
                </label>
                <label className="question">Please list all your symptoms</label>
                <Multiselect 
                      data={symptoms} /> 
                <button 
                    classname="appointment__appointmentButton" 
                    type="submit">
                    Submit
                </button>
            </form>
            </div>
            <h2>Your List of Appointment Requests</h2>
        </div>
        )
    }


export default Appointment;
