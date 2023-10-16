import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewCard = (props) => {
    const [user,setUser]=useState({});
    const [review,setReview]=useState({});
    const navigate=useNavigate();

    const getEmployee=(id)=>{
        axios.get(`/employee/profile/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log('employee',res.data.employee);
            setUser(res.data.employee);
        })
        .catch((err)=>{
           setUser({name:'User deleted',email:'unknown'});
        })
    }
    const getReview=(id)=>{
        axios.get(`/review/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log('review',res.data);
            setReview(res.data);
            getEmployee(res.data.to);
        })
    }
    const handleRedirect=()=>{
        if(user.name==='User deleted' || user.email==='unknown'){
            toast.error('User deleted, cannot view profile');
            return;
        }
        props.setActiveTab('reviews');
        navigate(`/employee/${user._id}`)
    }
    useEffect(() => {
        if(props.type==='received'){
            setReview(props.review);
            getEmployee(props.review.from);
        }
        else{
            getReview(props.review.review)
        }
    }, []);
    return (
        <div className="review">
            <div className="review__header">
                <div className="review__header__info" onClick={handleRedirect} >
                    <img src="https://i.pinimg.com/736x/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.jpg" alt="profile_pic" />
                    <div className="review__header__name">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="review__header__rating">
                    <div className="behaviour circular-rating">
                        <div className="rating-circle">
                            <CircularProgressbar value={review.behavior} minValue={0} maxValue={5} text={`${review.behavior}`} />
                        </div>
                        <p>Behaviour</p>
                    </div>
                    <div className="work_ethics circular-rating">
                        <div className="rating-circle">
                            <CircularProgressbar value={review.work_ethics} minValue={0} maxValue={5} text={`${review.work_ethics}`} />
                        </div>
                        <p>Work Ethics</p>
                    </div>
                    <div className="punctuality circular-rating">
                        <div className="rating-circle">
                            <CircularProgressbar value={review.punctuality} minValue={0} maxValue={5} text={`${review.punctuality}`} />
                        </div>
                        <p>Punctuality</p>
                    </div>
                    <div className="overall_rating circular-rating">
                        <div className="rating-circle">
                            <CircularProgressbar value={review.overall_rating} minValue={0} maxValue={5} text={`${review.overall_rating}`} />
                        </div>
                        <p>Overall Rating</p>
                    </div>
                </div>
            </div>
            <div className="review__body">
                <p>{review.review}</p>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu metus arcu. In hendrerit sapien a odio scelerisque rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Fusce tincidunt tortor a nibh commodo scelerisque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras fringilla euismod vestibulum. Morbi laoreet dictum odio sit amet pulvinar.</p> */}
            </div>
        </div>
    );
};

export default ReviewCard;
