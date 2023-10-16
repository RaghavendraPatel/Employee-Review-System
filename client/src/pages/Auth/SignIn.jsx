
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext} from "../../context/userContext";
import { useActiveEmployeeContext } from "../../context/activeEmployeeContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import "./auth.scss";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setActiveUser } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            toast.error("Already Logged In");
            navigate(`/employee/${user.employeeId}`);
        }
    }, [user]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email:email, password:password };
        try {
            axios.post("/user/create-session", data,
            { 
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true 
            })
            .then((res) => {
                console.log(res.data.data);
                setActiveUser(res.data.data);

                toast.success("Logged In Successfully");
                navigate(`/employee/${res.data.data.employeeId}`);
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="auth">
            <div className="auth__container">
                <h1 className="auth__title">Sign In</h1>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input
                        type="email"
                        className="auth__form-input"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth__form-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="auth__form-submit">Sign In</button>
                </form>
                <div className="redirect">
                    <p>Don't have an account? 
                        <span className="auth__form-link" onClick={() => navigate("/signup")}> Sign Up</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;