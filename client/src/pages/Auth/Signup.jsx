import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import "./auth.scss";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        console.log(user)
        if (user) {
            toast.error("Already Logged In");
            navigate("/");
        }
    }, [user]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email:email, password:password, name:name };
        try {
            axios.post("/user/create", data,
            { 
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true 
            })
            .then((res) => {
                console.log(res);
                toast.success("User Created Successfully");
                navigate("/signin");
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
                <p className="auth__title">Sign Up</p>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input
                        type="text"
                        placeholder="Name"
                        className="auth__form-input"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="auth__form-input"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth__form-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="auth__form-submit" type="submit">Sign Up</button>
                </form>
                <div className="redirect">
                    <p>Already have an account? 
                        <span className="auth__form-link" onClick={() => navigate("/signin")}> Sign In</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Signup;