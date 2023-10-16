import React, { useState } from 'react';
import {useUserContext} from '../../context/userContext';
import {useReviewFormContext} from '../../context/reviewFormContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Rating } from 'react-simple-star-rating'
import './reviewForm.scss';
const ReviewForm = ({getEmployee}) => {
    const {user}=useUserContext();
    const {formFor,setFormVisible}=useReviewFormContext();
    const {name,email,_id} = formFor;
    const navigate=useNavigate();
    const [behavior,setBehavior]=useState(0);
    const [punctuality,setPunctuality]=useState(0);
    const [workEthic,setWorkEthic]=useState(0);

    const handleBehavior=(rate)=>setBehavior(rate);
    const handlePunctuality=(rate)=>setPunctuality(rate);
    const handleWorkEthic=(rate)=>setWorkEthic(rate);

    const handleCancel=()=>{
        setBehavior(0);
        setPunctuality(0);
        setWorkEthic(0);
        setFormVisible(false);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if( !e.target.review.value){
            toast.error('Please write a review');
            return;
        }
        const formData=new FormData(e.target);
        const data={
            from:user.employeeId,
            to:_id,
            behavior,
            punctuality,
            work_ethics:workEthic,
            review:formData.get('review'),
        }
        console.log(data);
        axios.post('/employee/create-review',data,{headers:{"Content-Type": "application/x-www-form-urlencoded"},withCredentials:true}).then((res)=>{
            console.log(res.data);
            handleCancel();
            toast.success('Review Submitted Successfully');
            getEmployee(user.employeeId);
        }).catch((err)=>{
            console.log(err);
            toast.error('Error Submitting Review');
        }
        )
    }
    return (
        <div className="review__form">
            <div className="form__container">     
                <div className="review__form__header">
                    <h2>Write a Review for <span>{name}</span></h2>
                    <div className="cancel" onClick={handleCancel}>X</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="review__form__rating">
                        <p>Behavior</p>
                        <Rating onClick={handleBehavior} initialValue={behavior}/>
                    </div>
                    <div className="review__form__rating">
                        <p>Punctuality</p>
                        <Rating onClick={handlePunctuality} initialValue={punctuality}/>
                    </div>
                    <div className="review__form__rating">
                        <p>Work Ethic</p>
                        <Rating onClick={handleWorkEthic} initialValue={workEthic}/>
                    </div>
                    <div className="review__form__review">
                        <textarea name="review" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="review__form__buttons">
                        <button type="submit">Submit Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
