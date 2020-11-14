import React, { useState, useEffect } from 'react';
import './Rating.css';
import Axios from 'axios';

    
function Rating() {
    const [id, setId] = useState('');
    const [ratingNumber, setRatingNumber] = useState('');
    const [review, setReview] = useState('');
    const [ratingList, setRatingList] = useState('');

    const [newReview, setNewReview] = useState('');
    const submitReview = () => {
        Axios.post('http://localhost:3001/api/insert_rating', {
            appointment_id: id, 
            numeric_rating: ratingNumber, 
            description: review,
        });
        
        setRatingList([
            ...ratingList, {
                appointment_id:id,
                numeric_rating: ratingNumber,
                description: review },
            ]);
    };

    const deleteReview = (review) => {
        Axios.delete(`http://localhost:3001/api/delete_rating/${review}`)
    }

    const updateReview = (review) => {
        Axios.put('http://localhost:3001/api/update_rating/', {
            appointment_id: review, 
            description: newReview,
        });
        setNewReview("")
    }   

    useEffect(()=> {
        Axios.get('http://localhost:3001/api/get_rating')
        .then((response) => {
            setRatingList(response.data)
        });
    }, [])

    return (
        <div className="rating">
            <div>
                <label>Select your appointment id</label>
                    <input type="text" name="id" onChange={(e)=>
                    {setId(e.target.value)
                    }} />
                <label>Rating [Worst "1" --- Best "5"</label>
                    <select name="ratingNumber" onChange={(e)=>
                    {setRatingNumber(e.target.value)
                    }}>
                        <option type="number" value="1">1</option>
                        <option type="number" value="2">2</option>
                        <option type="number" value="3">3</option>
                        <option type="number" value="4">4</option>
                        <option type="number" value="5">5</option>
                    </select>
                <label>Review</label>
                    <input type="text" name="review" onChange={(e)=>
                    {setReview(e.target.value)
                    }}/>
                <button onClick={submitReview}> Submit</button>
                {ratingList.map((value)=> {
                    return (
                        <div className="card"> 
                          Appointment ID: {value.appointment_id} | Rating Number: {value.numeric_rating} | Review: {value.description}
                            <button onClick={()=>{deleteReview(value.appointment_id)}}>Delete</button>
                            <input type="text" id="updateInput" onChange={(e)=>{
                                setNewReview(e.target.value)
                            }} />  
                            <button onClick={()=> {updateReview(value.appointment_id)}}>Update</button>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default Rating;
