import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneUnlock } from "react-icons/ai";
import { FC, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface formProps {
    email: string,
    password: string
}

const Form: FC<formProps> = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        axios.post("http://localhost:8081/login", values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/")
                } else {
                    alert(res.data.Msg)
                }
            })
            .catch(err => console.log(err))

    }


    return (
        <div className="login_form_container">
            <div className="login_form" >
                <h2>Login</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="input_group">
                        <FaUserAlt className="fa" />
                        <input
                            type="email"
                            name='email'
                            placeholder="Enter email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className="input_text"
                            autoComplete="off"
                        />
                    </div>
                    <div className="input_group">
                        <AiTwotoneUnlock className="fa" />
                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="input_text"
                            autoComplete="off"
                        />
                    </div>
                    <div className="button_group" id="login_button">
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className="fotter">
                    <a>Forgot password?</a>
                    <a>Signup</a>
                </div>
            </div>
        </div>
    )
}

export default Form
