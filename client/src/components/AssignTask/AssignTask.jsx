import { useActiveEmployeeContext } from "../../context/activeEmployeeContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./assignTask.scss";

const AssignTask = ({employees}) => {
    const {        
        activeAssignForm,
        setActiveAssignFormContext,
        assignFormFor,
        setAssignFormForContext, 
    } = useActiveEmployeeContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!e.target.task.value) {
            toast.error("Please select an employee");
            return; 
        }
        console.log(e.target.task.value);
        console.log(employees)
        axios.post(`/admin/assign`, 
            {
                to : e.target.task.value,   
                from : assignFormFor._id,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true
            }

        ).then((res) => {
            console.log(res.data);
            toast.success("Task Assigned");
            setActiveAssignFormContext(null);
            setAssignFormForContext(null);
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message);
        }
        )

    }
    const handleCancel = () => {
        setActiveAssignFormContext(null);
        setAssignFormForContext(null);
    }

    return (
        <div className="assign-task__form">
            <form onSubmit={handleSubmit}>
                <div className="assign-task__form__header">
                    <h3>Assign Task to {assignFormFor.name}</h3>
                    <div className="cancel" onClick={handleCancel}>X</div>
                </div>
                <div className="assign-review">
                    <label htmlFor="">Select employee to review</label>
                    <select name="task" id="">
                        <option value="" disabled selected>Select Employee</option>
                    {employees.map((employee) => {
                        if(employee.userid !== assignFormFor.userid) {
                            return <option key={employee._id} value={employee._id}>{employee.name}</option>
                        }
                    })}
                    </select>
                </div>
                <div className="assign-task__form__footer">
                    <button type="submit">Assign</button>
                </div>
            </form>

        </div>
    );
};
export default AssignTask;