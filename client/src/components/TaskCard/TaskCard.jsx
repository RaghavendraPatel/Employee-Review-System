import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
import './taskCard.scss';
import { useUserContext } from '../../context/userContext';
import { useReviewFormContext } from '../../context/reviewFormContext';
const TaskCard = ({ task ,setActiveTab}) => {

    const [employee,setEmployee]=useState({});
    const navigate=useNavigate();
    const {user}=useUserContext();
    const {setFormVisible,setFormFor}=useReviewFormContext();
    const {id}=useParams();

    const getEmployee=(id)=>{
        axios.get(`/employee/profile/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log('employee',res.data.employee);
            setEmployee(res.data.employee);
        })
        .catch((err)=>{
           setEmployee({name:'unknown',email:'unknown'});
        })
    }
    useEffect(() => {
        getEmployee(task);
    }, []);

    const handleReview=()=>{
        if(!user){
            navigate('/signin');
        }
        else{
            setFormFor(employee);
            setFormVisible(true);
        }
    }

    return (
        <div className="task-card">
            <div className="employee">
                <img src="https://i.pinimg.com/736x/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.jpg" alt="profile_pic" />
                <div className="employee__name">
                    <h4>{employee.name}</h4>
                    <p>{employee.email}</p>
                </div>
            </div>
            <div className="employee__rating">
                <AiOutlineStar/>
                {employee.total_reviews === 0 ? <p>No Reviews</p> : <p>{employee.rating} <span className="employee__review-count">({employee.total_reviews} reviews)</span></p>}
            </div>
            <div className="employee__role">
                <p> {employee.role}</p>
            </div>
            <div className="employee__options">
                <button className="button" onClick={()=>{
                        setActiveTab('reviews');
                        navigate(`/employee/${task}`)
                    }}>View Profile
                </button>
                {user && user.employeeId === id &&
                    <button className="button" onClick={handleReview}>Review</button>
                }
            </div>
        </div>
    );
};

export default TaskCard;
