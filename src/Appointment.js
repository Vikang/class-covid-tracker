import React, { Component } from "react";
//import moment from "moment";
import './Appointment.css';

class Appointment extends Component {
    render(){
    return (
        <div className="appointment">
            <form>
            
                <label>Location</label>
                <select>
                    <option value="student_health">UVA Student Health and Wellness</option>
                    <option value="uva">UVA University Hospital</option>
                    <option value="children">UVA Children's Hospital</option>
                </select>
                <label>Please describe your symptoms:</label>
            </form>
        </div>
    )
    }
}

export default Appointment
