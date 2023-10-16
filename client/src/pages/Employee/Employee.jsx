import { useUserContext } from "../../context/userContext";
import { useActiveEmployeeContext } from "../../context/activeEmployeeContext";
import { useReviewFormContext } from "../../context/reviewFormContext";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import "./employee.scss";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import TaskCard from "../../components/TaskCard/TaskCard";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

const Employee = () => {
    const { user,logout,setActiveUser } = useUserContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("reviews");
    const {
        activeEmployee,
        setActiveEmployeeContext,
    } = useActiveEmployeeContext();

    const { formVisible } = useReviewFormContext();

    const base_url = process.env.REACT_APP_API_PATH||'';

    const getEmployee=()=>{
        axios.get(`${base_url}/employee/profile/${id}`,{withCredentials:true})
        .then((res)=>{
            console.log(res.data.employee);
            setActiveEmployeeContext(res.data.employee);
        }).catch((err)=>{
            if(err.response.data.message === "Unauthorized"){
                setActiveUser(null);
                logout();
                toast.error("Session Expired");
                navigate("/signin");
            }
        })
    }

    useEffect(() => {
        console.log(user);
        if(!user) {
            toast.error("Please Login First");
            navigate("/signin");
        }
        getEmployee();
    },[id]);
    return (
        <div className="employee">
            {activeEmployee &&
            <>
            <div className="employee__header">
                <h2>Employee Review System</h2>
                <div className="employee__header__buttons">
                    {(user.employeeId !== id) &&<button className="button" onClick={()=>{navigate(`/employee/${user.employeeId}`)}}>Your Profile</button>}
                    {(user.role === 'admin')&&<button className="button"onClick={()=>{navigate('/admin')}}>Admin Panel</button>}
                    <button onClick={()=>{logout();navigate('/signin')}}>Logout</button>
                </div>
            </div>
            <div className="employee__details">
                <img src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png" alt="profile_pic" />
                <div className="employee__details__info">
                    <div className="employee-name">
                        <h3>{activeEmployee.name}</h3> 
                        <p>{activeEmployee.email}</p>
                    </div>
                    <div className="employee-role">
                        <p>{activeEmployee.role}</p>
                    </div>
                    <div className="rating">
                    <AiOutlineStar/>
                        {activeEmployee.total_reviews === 0 ? <p>No Reviews</p> : <p>{activeEmployee.rating} <span className="employee__review-count">({activeEmployee.total_reviews} reviews)</span></p>}
                    </div>
                </div>
            </div>
            <div className="employee__reviews">
                <div className="employee__reviews__header">
                    <div className={(activeTab=="reviews")?"review-btn active": "review-btn"} onClick={()=>setActiveTab('reviews')}>Reviews</div>
                    {(user.employeeId === id || user.role==='admin') && <>
                        <div className={(activeTab=="reviewed")?"review-btn active": "review-btn"} onClick={()=>setActiveTab('reviewed')}>Reviewed</div>
                        <div className={(activeTab=="tasks")?"review-btn active": "review-btn"} onClick={()=>setActiveTab('tasks')}>Tasks</div>
                    </>}
                </div>
                {(activeTab=="reviews") && 
                <div className="review-list">
                    {(activeEmployee.reviews.length>0)?activeEmployee.reviews.map((review) => (
                       <ReviewCard review={review} key ={review._id} type={'received'} setActiveTab={setActiveTab}/>
                    )):<div className="empty">No Reviews Received</div>}
                </div>}
                {(activeTab=="reviewed") && ((user.employeeId === id) || user.role==='admin') &&
                <div className="review-list">
                    {(activeEmployee.reviewed.length>0)?activeEmployee.reviewed.map((review) => (
                       <ReviewCard review={review} key ={review._id} type={'given'} setActiveTab={setActiveTab}/>
                    )):<div className="empty">No Reviews Given</div>}
                </div>}
                {(activeTab=="tasks") && ((user.employeeId === id) || user.role==='admin') &&
                <div className="task-list">
                        {(formVisible) && <ReviewForm getEmployee={getEmployee}/>}
                        {(activeEmployee.pending_reviews.length>0)?activeEmployee.pending_reviews.map((task) => (
                            <TaskCard task={task} key ={task} setActiveTab={setActiveTab}/>
                        )):<div className="empty">No Tasks Assigned</div>}
                </div>}
            </div></>}
        </div>
    )
}
export default Employee;