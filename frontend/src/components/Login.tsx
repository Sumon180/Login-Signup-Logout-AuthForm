import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneUnlock } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface FormProps {
    email: string;
    password: string;
}

const Login = () => {
    const [values, setValues] = useState<FormProps>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8081/login", values);
            if (res.data.Status === "Success") {
                console.log(res);
                navigate("/");
            } else {
                alert(res.data.Msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login_form_container">
            <div className="login_form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input_group">
                        <FaUserAlt className="fa" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                            }
                            className="input_text"
                            autoComplete="off"
                        />
                    </div>
                    <div className="input_group">
                        <AiTwotoneUnlock className="fa" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={(e) =>
                                setValues({ ...values, password: e.target.value })
                            }
                            className="input_text"
                            autoComplete="off"
                        />
                    </div>
                    <div className="button_group" id="login_button">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className="fotter">
                    <Link to={"/forgotpasswordpage"}>Forgot password?</Link>
                    <Link to={"/signuppage"}>Signup</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
