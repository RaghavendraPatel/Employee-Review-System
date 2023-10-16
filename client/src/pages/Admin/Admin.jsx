import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext} from "../../context/userContext";
import "./admin.scss";
import EmployeeCard from '../../components/EmployeeCard/EmployeeCard';
import AssignTask from '../../components/AssignTask/AssignTask';
import EditEmployee from '../../components/EditEmployee/EditEmployee';
// import { ActiveEmployeeProvider } from '../../context/activeEmployeeContext';
import { useActiveEmployeeContext } from '../../context/activeEmployeeContext';

const Admin = () => {
    const { user, logout } = useUserContext();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    
    const { 
        activeEmployee, 
        setActiveEmployeeContext, 
        activeEmployeeOptions,
        setActiveEmployeeOptionsContext,
        activeAssignForm,
        setActiveAssignFormContext,
        assignFormFor,
        setAssignFormForContext, 
        activeEmployeeEditForm,
        setActiveEmployeeEditForm,
        employeeEditFormFor,
        setEmployeeEditFormFor,
    } = useActiveEmployeeContext();

    const getEmployees = async () => {
        try {
            const res = await axios.get("/admin/employees");
            console.log(res.data.data.employees);
            setEmployees(res.data.data.employees);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(user)
        if(!user) {
            toast.error("Please Login First");
            navigate("/signin");
        }
        else if(user && user.role !== "admin") {
            toast.error("You are not an admin");
            navigate("/");
        }
        else {
            getEmployees();
        }
    }, [user]);

    return (
        <div className="admin">
            { user && user.role === "admin" &&<>
            <div className="nav">
                <div className="nav-left">
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="nav-right">
                    <button onClick={()=>{navigate(`/employee/${user.employeeId}`)}} className="btn">Your Profile</button>
                    <button onClick={()=>{logout();navigate('/signin')}} className="btn">Logout</button>
                </div>
            </div>
            {activeAssignForm && <AssignTask employees={employees}/>}
            {activeEmployeeEditForm && <EditEmployee getEmployees={getEmployees}/>}
            <div className="container">
                <div className="employees">
                    <h3>Employee List</h3>
                    <div className="employee-list">
                        {employees.map((employee) => (
                            <EmployeeCard key={employee._id} employee={employee} />
                        ))}
                    </div>
                </div>
            </div></>}
        </div>
    )
}

export default Admin