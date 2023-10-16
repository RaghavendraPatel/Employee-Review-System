
import './employeeCard.scss'
import { useState } from 'react';
import axios from 'axios';
import { AiOutlineStar } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { useActiveEmployeeContext } from '../../context/activeEmployeeContext';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee }) => {

    const { 
        setActiveEmployeeContext, 
        activeEmployeeOptions,
        setActiveEmployeeOptionsContext,
        setActiveAssignFormContext,
        setAssignFormForContext, 
        setActiveEmployeeEditForm,
        setEmployeeEditFormFor,
    } = useActiveEmployeeContext();

    const { user } = useUserContext();

    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_API_PATH||'';

    window.onclick = function(event) {

        if (!event.target.matches('.dots')) {
            const dots = document.querySelectorAll(".dots");
            dots.forEach((dot) => {
                dot.classList.remove('on');
            })
            setActiveEmployeeOptionsContext(null);
        }
    }

    const handleToggle = () => {
        const dots = document.querySelectorAll(".dots");
        dots.forEach((dot) => {
            if(dot.id !== `dot-${employee.userid}`)
                dot.classList.remove('on');
        })
        document.querySelector(`#dot-${employee.userid}`).classList.toggle('on');
        if(activeEmployeeOptions  !== employee._id) {
            setActiveEmployeeOptionsContext(employee._id);
        }
        else {
            setActiveEmployeeOptionsContext(null);
        }
    }

    const handlePromote = () => {
        if(employee.role === "employee") {
            employee.role = "admin";
            axios.get(`${base_url}/admin/promote/${employee.userid}`)
            .then((res) => {
                console.log(res.data);
                toast.success("Employee Promoted to Admin");
            }).catch((err) => {
                console.log(err);
                employee.role = "employee";
                toast.error("Something went wrong");
            })
        }
        else {
            employee.role = "employee";
            axios.get(`${base_url}/admin/demote/${employee.userid}`)
            .then((res) => {
                console.log(res.data);
                toast.success("Admin Demoted to Employee");
            }
            ).catch((err) => {
                console.log(err);
                employee.role = "admin";
                toast.error("Something went wrong");
            })
        }
    }

    const handleAssign = () => {
        setActiveAssignFormContext(true);
        setAssignFormForContext(employee);
    }

    const handleEdit = () => {
        setActiveEmployeeEditForm(true);
        setEmployeeEditFormFor(employee);
    }

    const viewProfile = () => {
        setActiveEmployeeContext(employee);
        navigate(`/employee/${employee._id}`);
    }
    const handleRemove = () => {
        axios.get(`${base_url}/admin/remove/${employee.userid}`, {withCredentials: true})
        .then((res) => {
            console.log(res.data);
            toast.success("Employee Removed");
        }).catch((err) => {
            console.log(err);
            toast.error("Something went wrong");
        })
    }
    return(
        <div className="employee__card">
            <div className="employee__info" >
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
                    <button className="dots" onClick={handleToggle} id={`dot-${employee.userid}`}><span></span></button>
                </div>
            </div>
            <div className={(activeEmployeeOptions===employee._id)?'expand':'collapse'}>
                <div className="view option" onClick={viewProfile}>
                    <p>View Profile</p>
                </div>
                <div className="assign option" onClick={handleAssign}>
                    <p>Assign Task</p>
                </div>
                <div className="edit option" onClick={handleEdit}>
                    <p>Edit Employee</p>
                </div>
                {(user.userid !== employee.userid)?
                    <>
                        <div className="promote option" onClick={handlePromote}>
                            {(employee.role === "employee")?<p>Promote to Admin</p>:<p>Demote to Employee</p>}
                        </div>
                        <div className="delete option" onClick={handleRemove}>
                            <p>Remove Employee</p>
                        </div>
                    </>
                :null}
            </div>
        </div>
    )
};
export default EmployeeCard;