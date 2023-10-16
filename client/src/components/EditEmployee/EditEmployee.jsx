import { useActiveEmployeeContext } from "../../context/activeEmployeeContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./editEmployee.scss"

const EditEmployee = ({getEmployees}) => {
    const { 
        activeEmployeeEditForm,
        setActiveEmployeeEditForm,
        employeeEditFormFor,
        setEmployeeEditFormFor,
    } = useActiveEmployeeContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = (new FormData(e.target));
        const data = {
            empid : employeeEditFormFor._id,
            userid: employeeEditFormFor.userid,
            ...Object.fromEntries(formData),
        }
        axios.post("/admin/edit", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            toast.success("Employee Details Updated Successfully");
            setActiveEmployeeEditForm(null);
            setEmployeeEditFormFor(null);
            getEmployees();
        })
        .catch((err) => {
            console.log(err);
            toast.error("Error Updating Employee Details");
        })
    }
    const handleCancel = () => {
        setActiveEmployeeEditForm(null);
        setEmployeeEditFormFor(null);
    }

    return (
        <div className="edit-employee__form">
            <form onSubmit={handleSubmit}>
                <div className="edit-employee__form__header">
                    <h3>Edit Employee Details</h3>
                    <div className="cancel" onClick={handleCancel}>X</div>
                </div>
                <div className="edit-employee">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" id="" defaultValue={employeeEditFormFor.name}/>
                </div> 
                <div className="edit-employee">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="" defaultValue={employeeEditFormFor.email}/>
                </div>
                <div className="edit-employee">
                    <label htmlFor="">Role</label>
                    <select name="role" id="" defaultValue={employeeEditFormFor.role}>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="edit-employee__btn">
                    <button type="submit" className="btn">Update</button>
                </div>
            </form>
        </div>
    )
}
export default EditEmployee;