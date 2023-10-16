import { useState, useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '../../context/userContext'
import axios from 'axios'

const Home = () => {
    const { user, setActiveUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            toast.error("Please Login First");
            navigate("/signin");
        }
        else{
            if(user.role === 'admin'){
                navigate('/admin');
            }
            else{
                navigate(`/employee/${user.employeeId}`);
            }
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            axios.get("/user/destroy-session", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setActiveUser(null);
                toast.success("Logged Out Successfully");
                navigate("/signin");
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
        </div>
    )
}

export default Home